## PART 1

Seed 14 is wrong not sure why

<!-- Input 14 should have final output of 43, but has 32 -->

Goes wrong at water stage input 53 should have output of 49 but has 38

```
fertilizer-to-water map:
49 53 8 -- 49
0 11 42 -- 38
42 0 7 -- 38
57 7 4 -- 38
```

This looks correct to me!

The issue was it doesn't run all of the maps but stops as soon as it finds the first map that works (or maps to itself if no mapping found).

## PART 2

We need to reduce the range of seeds tested.
First off we can use a set
