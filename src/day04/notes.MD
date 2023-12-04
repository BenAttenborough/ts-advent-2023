## Part 2

This seems a bit tricky b/c we can end up trying manipulating an array as we itterate over it

It might be better to create each card as an object

```TS
type Card = {
    value: number,
    amount: number
}
```

Then instead of adding elements to the array we just increment the amount field
