import type { CodeSnippet } from "@/components/CodeBlock";

export type ArchLayer = {
  name: string;
  blurb: string;
  items: string[];
};

export type Decision = {
  title: string;
  body: string;
};

export type CaseStudy = {
  /** Matches the project slug. */
  slug: string;
  title: string;
  /** Short problem statement. */
  intro: string;
  /** The hard parts, as bullets. */
  challenges: string[];
  architecture: {
    description: string;
    /** Top-to-bottom layers for the diagram. */
    layers: ArchLayer[];
    /** Optional caption under the diagram (defaults to clean-arch wording). */
    caption?: string;
  };
  snippets: CodeSnippet[];
  decisions: Decision[];
  /** Note shown near the code, clarifying snippets are illustrative. */
  codeNote: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "insightaide",
    title: "InsightAide — architecting a quant research platform solo",
    intro:
      "InsightAide is a quantitative investment-research platform built end-to-end by one person on .NET 10. The goal was a system that could ingest market data, engineer features, train and rank models, and layer LLM reasoning on top — with the architectural discipline to stay maintainable as it grew to 25 projects, and the statistical rigor to avoid fooling itself.",
    challenges: [
      "Financial ML is dangerously easy to overfit — a naive backtest leaks future information and looks brilliant until it meets real data.",
      "LLM costs and vendor lock-in balloon quickly without a routing and accounting layer.",
      "A solo-built system spanning data, ML, and API surface has to stay modular, or it becomes impossible to change safely.",
    ],
    architecture: {
      description:
        "The solution is a strict four-tier clean architecture spanning 25 projects. Dependencies point inward — Presentation depends on the domain engines and application services, which depend on Foundation, never the reverse. Each engine is an isolated, testable unit, so the ML pipeline can evolve without touching the API and vice versa.",
      layers: [
        {
          name: "Presentation",
          blurb: "Entry points",
          items: ["API", "Client"],
        },
        {
          name: "Domain engines",
          blurb: "11 modules",
          items: [
            "Ingestion",
            "Feature Engineering",
            "Modeling",
            "Evaluation",
            "Serving",
          ],
        },
        {
          name: "Application",
          blurb: "Services",
          items: ["Identity", "Notifications", "Analytics"],
        },
        {
          name: "Foundation",
          blurb: "Core + infrastructure",
          items: ["Core", "Common", "Domain", "Infrastructure"],
        },
      ],
    },
    codeNote:
      "The snippets below are illustrative of the techniques used — simplified to show the approach without exposing proprietary signal logic.",
    snippets: [
      {
        filename: "RoutingLlmProvider.cs",
        language: "csharp",
        note: "A single entry point routes claude-* and gpt-* models to the right vendor and logs per-call cost — so provider choice never leaks into calling code, and every token is accounted for.",
        code: `// Route each request to the right provider by model prefix,
// then record token usage + estimated cost for every call.
public async Task<LlmResponse> CompleteAsync(LlmRequest request, CancellationToken ct)
{
    ILlmProvider provider = request.Model switch
    {
        var m when m.StartsWith("claude-") => _anthropic,
        var m when m.StartsWith("gpt-")    => _openAi,
        _                                  => _default,
    };

    var response = await provider.CompleteAsync(request, ct);

    await _usageLog.RecordAsync(new ApiUsage(
        provider:         provider.Name,
        model:            request.Model,
        inputTokens:      response.Usage.InputTokens,
        outputTokens:     response.Usage.OutputTokens,
        estimatedCostUsd: _pricing.Estimate(request.Model, response.Usage)), ct);

    return response;
}`,
      },
      {
        filename: "WalkForwardValidator.cs",
        language: "csharp",
        note: "Even a correct train/test split leaks when a label's outcome window straddles the boundary. Purging removes those rows and the embargo adds a buffer — so the model can never train on information bleeding out of the test period. This is the core defense against lookahead bias.",
        code: `// Drop any training row whose label window overlaps the test fold,
// plus an embargo buffer on each side.
private IReadOnlyList<Sample> PurgeAndEmbargo(
    IReadOnlyList<Sample> train,
    DateRange testFold,
    TimeSpan labelWindow,
    TimeSpan embargo)
{
    var lower = testFold.Start - labelWindow - embargo;
    var upper = testFold.End + embargo;

    return train
        .Where(s => s.Timestamp < lower || s.Timestamp > upper)
        .ToList();
}`,
      },
      {
        filename: "RankingModelTrainer.cs",
        language: "csharp",
        note: "Positive backtest returns are easy to get by luck. Gating on a t-statistic means a model must prove its top-vs-bottom ranking spread is unlikely to be noise on unseen data before it's ever saved.",
        code: `// Persist a model only if its out-of-sample top-vs-bottom spread
// is statistically significant — not merely positive.
var spread = oos.TopDecileReturn - oos.BottomDecileReturn;
var tStat  = spread.Mean / spread.StdError;

if (tStat < MinTStat)   // MinTStat = 1.0
{
    _log.LogInformation(
        "Rejecting model: OOS spread t-stat {T:F2} below gate", tStat);
    return SaveResult.Rejected;
}

await _registry.SaveAsync(model, metrics, ct);`,
      },
    ],
    decisions: [
      {
        title: "No live trading, by design",
        body: "Keeping the system research-and-analysis only removes execution risk and regulatory surface entirely, and lets the engineering focus stay on signal quality and evaluation rigor rather than order routing.",
      },
      {
        title: "In-process ML.NET over a Python microservice",
        body: "Running LightGBM natively in .NET keeps the whole platform a single deployable — no cross-language serialization, no extra service to operate, no model-server drift between training and inference.",
      },
      {
        title: "A router in front of the LLMs",
        body: "Abstracting Claude and OpenAI behind one provider interface avoids vendor lock-in, allows routing by capability and cost, and makes per-call accounting a first-class concern instead of an afterthought.",
      },
    ],
  },
  {
    slug: "hunter-metric",
    title: "Hunter Metric — model governance for predictive sports analytics",
    intro:
      "Hunter Metric predicts game outcomes across six professional sports. The real engineering challenge isn't building a model that looks good on paper — it's proving, continuously, that a model's stated probabilities are actually trustworthy before anyone relies on them. The system is built around calibration and governance: every model earns its way into production.",
    challenges: [
      "A model that says '70% chance' is worthless if that outcome only happens 55% of the time — raw scores must be calibrated into honest probabilities.",
      "Six different sports each need their own model, but a shared, consistent evaluation and promotion standard.",
      "Backtests are trivially easy to fake with future-leaking data, so evaluation has to be provably chronological.",
      "A single model can be confidently wrong — you need a way to know when to trust a prediction and when not to.",
    ],
    architecture: {
      description:
        "The platform is a staged pipeline: raw game and line data flows into six native per-sport models, whose outputs are combined by a multi-family ensemble and passed through a shared assembler that calibrates, governs, and gates every probability before it surfaces.",
      caption:
        "Data flows downward — each stage feeds the next, from raw game data to a governed, calibrated probability.",
      layers: [
        {
          name: "Data & ingestion",
          blurb: "Sources",
          items: ["Sports API adapters", "Odds / line snapshots", "Hangfire jobs"],
        },
        {
          name: "Per-sport win models",
          blurb: "Six native models",
          items: ["MLB", "NBA", "NFL", "WNBA", "NCAAF", "NCAAB"],
        },
        {
          name: "Ensemble",
          blurb: "Multi-family",
          items: ["Logistic Regression", "LightGBM", "ELO", "Agreement engine"],
        },
        {
          name: "Assembler & governance",
          blurb: "Calibrate + gate",
          items: [
            "Platt calibration",
            "Reliability diagrams",
            "Walk-forward gates",
            "Shadow → Active",
          ],
        },
        {
          name: "Surface",
          blurb: "Delivery",
          items: ["REST API", "React SPA"],
        },
      ],
    },
    codeNote:
      "The snippets below are illustrative of the techniques used — simplified to show the approach without exposing proprietary modeling logic.",
    snippets: [
      {
        filename: "PlattCalibrator.cs",
        language: "csharp",
        note: "Raw model scores aren't probabilities. Platt scaling fits a logistic curve so that when the model says 70%, it wins about 70% of the time — verified against reliability diagrams before a model is trusted.",
        code: `// Fit p = sigmoid(A*z + B) so raw model scores become
// probabilities that match observed win frequencies.
public Calibration Fit(IReadOnlyList<(double Z, bool Won)> samples)
{
    double a = 1.0, b = 0.0;

    for (var iter = 0; iter < MaxIters; iter++)
    {
        double gradA = 0, gradB = 0;
        foreach (var (z, won) in samples)
        {
            var p = Sigmoid(a * z + b);
            var error = p - (won ? 1.0 : 0.0);   // gradient of log-loss
            gradA += error * z;
            gradB += error;
        }
        a -= LearningRate * gradA / samples.Count;
        b -= LearningRate * gradB / samples.Count;
    }

    return new Calibration(a, b);
}`,
      },
      {
        filename: "WalkForwardBuilder.cs",
        language: "csharp",
        note: "A sports model is only as honest as its backtest. Every fold trains on the past and validates on strictly later games — and the invariant throws rather than silently let future information leak into evaluation.",
        code: `// Build expanding-window folds and refuse any that could
// leak the future into evaluation.
foreach (var fold in BuildExpandingFolds(games, folds: 5))
{
    var maxTrain    = fold.Train.Max(g => g.Date);
    var minValidate = fold.Validate.Min(g => g.Date);

    if (maxTrain >= minValidate)
        throw new LeakageException(
            $"Training through {maxTrain:d} overlaps validation at {minValidate:d}");

    yield return Evaluate(fold);
}`,
      },
      {
        filename: "WinProbAssembler.cs",
        language: "csharp",
        note: "New models run in Shadow first — producing real predictions on live games that are recorded but never shown. A model graduates to Active only after it clears calibration and walk-forward gates, so nothing unproven ever reaches a user.",
        code: `// A model's predictions only surface once it's been promoted to
// Active. In Shadow it runs on real games but stays invisible.
public WinProbability? Assemble(GameContext game)
{
    var prediction = _calibrator.Apply(_model.Predict(game));

    // Always record — feeds later calibration + backtesting.
    _snapshots.Persist(game, prediction);

    return _mode switch
    {
        AssemblerMode.Active => prediction,   // authoritative
        AssemblerMode.Shadow => null,         // accrue data only
        _                    => null,         // Off
    };
}`,
      },
    ],
    decisions: [
      {
        title: "Calibration before confidence",
        body: "A probability is only useful if it's honest. Fitting Platt scaling and checking reliability diagrams — with a minimum sample threshold before a sport is considered calibrated — means the system never presents overconfident numbers it hasn't earned.",
      },
      {
        title: "Shadow mode before production",
        body: "Every new model runs invisibly on live games first, recording predictions without affecting anything. It only graduates to authoritative once it has proven calibrated skill against real outcomes — de-risking changes to a live system.",
      },
      {
        title: "An ensemble of models that disagree",
        body: "Logistic regression, LightGBM, and ELO capture different structure. Scoring their agreement — and treating high disagreement as lower confidence — turns three imperfect models into a signal that also knows when to stay quiet.",
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
