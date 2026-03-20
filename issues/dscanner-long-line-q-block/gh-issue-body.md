# `dscanner.style.long_line` false positive on multi-line `q{}` delimited strings

## Summary

`long_line_check` reports "Line is longer than 120 characters" on the opening line of a `q{ }` delimited string, even when that line is short. The diagnostic squiggle spans the entire block, suggesting the linter treats the whole token as one line instead of splitting on newlines.

## Minimal reproduction

```d
void createUI() {
    widget = parseML(q{
        VerticalLayout {
            layoutWidth: fill
            Button { text: "OK" }
        }
    });
}
```

With `long_line_check` enabled, the line `widget = parseML(q{` (~25 chars) triggers the rule.

## Expected

- Each physical line inside `q{ }` is checked separately.
- Only lines exceeding `max_line_length` (default 120) are reported.

## Actual

- The rule fires on the line containing `q{`.
- The squiggle extends across all following lines until the closing `}`.
- Individual lines inside the block may be under the limit but are still flagged.

## Evidence

![dscanner.style.long_line false positive on q{} block](https://raw.githubusercontent.com/dev-centr/devcentr/main/docs/assets/dscanner-long-line-bug-evidence.png)

- A ~35-character line `window.mainWidget = parseML(q{` underlined.
- VS Code tooltip: "Line is longer than 120 characters DScanner(dscanner.style.long_line)".
- Yellow squiggles on every line inside the `q{}` block.

## Possible fix

In `src/dscanner/analysis/line_length.d`:

1. For multi-line tokens (delimited strings, etc.), split on newlines and check each logical line separately.
2. When reporting, use the real source line where the overflow occurs, not `tok.line`.
3. Consider excluding or special-casing string-literal contents if line-length checks don't apply there.

## Workaround

```ini
[analysis.config.StaticAnalysisConfig]
long_line_check = "disabled"
```

Or increase the limit, or exclude specific modules:

```ini
[analysis.config.ModuleFilters]
long_line_check = "-my.project.module"
```
