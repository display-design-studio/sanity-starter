# Statistical Foundations

Understanding basic statistics prevents misinterpreting experiment results.

## Key Concepts

### Statistical Significance

The probability that results aren't due to random chance.

- **p-value < 0.05:** "Statistically significant" at 95% confidence
- Means: There's less than 5% chance the difference is random
- Does NOT mean: The change is important or meaningful

### Confidence Interval

The range where the true value likely falls.

Example: "Conversion rate increased by 5% (95% CI: 2% to 8%)"
- Best estimate: 5% improvement
- Could be as low as 2% or as high as 8%
- Narrower intervals = more certainty

### Statistical Power

The ability to detect a real effect when it exists.

- Standard: 80% power
- Higher power = larger sample size needed
- Low power = might miss real improvements

### Minimum Detectable Effect (MDE)

The smallest improvement worth detecting.

- Smaller MDE = larger sample size needed
- Be realistic: Can you act on a 0.5% improvement?

## Sample Size Calculation

Before running a test, calculate required sample size:

```
Required per variant = 16 × σ² / MDE²

Where:
- σ² = variance (for conversion rate: p × (1-p))
- MDE = minimum detectable effect (absolute)
```

For a 5% baseline conversion rate, detecting a 1% absolute lift (5% → 6%):
- Need ~3,000 visitors per variant
- Total: ~6,000 visitors minimum

## Common Statistical Mistakes

### Multiple Comparisons Problem

Testing 10 variants increases false positive rate.

**Solution:** Adjust significance threshold (Bonferroni correction) or use sequential testing methods.

### Peeking Problem

Checking results daily and stopping when significant.

**Why it's wrong:** Significance fluctuates. Early "winners" often regress.

**Solution:** Pre-commit to sample size and duration. Use sequential testing if you must peek.

### Simpson's Paradox

Overall results hide segmented truths.

Example:
- Overall: Variant B wins
- Mobile users: Variant A wins
- Desktop users: Variant A wins
- How? Different traffic mix per variant

**Solution:** Always segment by major factors (device, traffic source).

### Survivorship Bias

Only analyzing users who completed the funnel.

**Solution:** Include all visitors, not just converters.

## Interpreting Results

### Significant + Meaningful
Clear win. Implement the change.

### Significant + Trivial
Statistically different but tiny effect. Consider if worth the complexity.

### Not Significant + Large Effect
Might be real but underpowered. Extend the test or accept uncertainty.

### Not Significant + Small Effect
No detectable difference. Either no real effect or test was underpowered.

## When to Trust Results

Checklist before declaring a winner:
- [ ] Reached pre-calculated sample size
- [ ] Ran for full business cycle (1-2 weeks minimum)
- [ ] p-value < 0.05 (or your chosen threshold)
- [ ] Effect size is meaningful for business
- [ ] Results consistent across major segments
- [ ] No external factors contaminated results
