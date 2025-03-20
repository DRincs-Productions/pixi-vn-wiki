# Connect the UI components with the game variables

![Frame_Aufbau](https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fpixi-vn-usequery.png?alt=media)

The best way to connect the UI with the game variables is to use the TanStack Query library.

**What is TanStack Query?** TanStack Query is a library that allows you to manage the state of your application in a simple and efficient way. It is based on the concept of queries, mutations and subscriptions. This library is very useful and is compatible with React, Vue, Angular, Svelte, etc.

You can learn more about TanStack Query on the [TanStack website](https://tanstack.com/query/latest).

Here is an example:

In our example we would have two variables, `text1` and `text2`, saved in the [game storage](/start/storage.md), this variables will be updated either by an input in the UI or by a [label step](/start/labels.md).

Taking into account that a storage variables can only be changed during a [next step, go back](/start/labels.md#next-step-and-go-back), [run label](/start/labels.md#run-a-label) or [loading a save](/start/save.md#load) (outside the interface), we will create a `useQueryText1` and `useQueryText2` that will be updated after each [next step, go back](/start/labels.md#next-step-and-go-back), [run label](/start/labels.md#run-a-label) or [loading a save](/start/save.md#load).

```typescript
import { useQuery } from "@tanstack/react-query";
import { getLastSaveFromIndexDB } from "../utilities/save-utility";

// this is a "father" key that will be used to invalidate all queries that depend on it
export const INTERFACE_DATA_USE_QUEY_KEY = "interface_data_use_quey_key";

const TEXT1_USE_QUEY_KEY = "text1_save_use_quey_key";
export default function useQueryText1() {
 return useQuery({
  queryKey: [INTERFACE_DATA_USE_QUEY_KEY, TEXT1_USE_QUEY_KEY],
  queryFn: async () => {
    return storage.getVariable<string>("text1") || "";
  },
 });
}

const TEXT2_USE_QUEY_KEY = "text2_save_use_quey_key";
export default function useQueryText2() {
 return useQuery({
  queryKey: [INTERFACE_DATA_USE_QUEY_KEY, TEXT2_USE_QUEY_KEY],
  queryFn: async () => {
    return storage.getVariable<string>("text2") || "";
  },
 });
}
```

For invalidate the queries we can use the `queryClient.invalidateQueries` function.

In this example if we want to update all the queries that depend on the `INTERFACE_DATA_USE_QUEY_KEY` key, we can use the following code:

```ts
const queryClient = useQueryClient()
queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
```

If we want to update only the `text1` or `text2` query, we can use the following code:

```ts
const queryClient = useQueryClient()
queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY, TEXT1_USE_QUEY_KEY] })
queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY, TEXT2_USE_QUEY_KEY] })
```

```typescript
const queryClient = useQueryClient()

narration.goNext({})
    .then((result) => {
        queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
    });

narration.goBack({})
    .then((result) => {
        queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
    });

loadSaveJson(jsonString, navigate)
    .then(() => {
        queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
    })

// only if you are not in a label step
narration.callLabel("myLabel", {})
    .then((result) => {
        queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
    });
```

In the UI we will use the `useQueryText1` and `useQueryText2` hooks to get the values of the variables `text1` and `text2`.

```tsx
// react example
export function MyComponent() {
    const { data: text1 = "" } = useQueryText1()
    const { data: text2 = "" } = useQueryText2()
    const queryClient = useQueryClient()

    return (
        <>
            <Input
                sx={{
                    pointerEvents: "auto",
                }}
                value={text1}
                onChange={(e) => {
                    storage.setVariable("text1", e.target.value);
                    queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY, TEXT1_USE_QUEY_KEY] })
                }}
            />
            <Input
                sx={{
                    pointerEvents: "auto",
                }}
                value={text2}
                onChange={(e) => {
                    storage.setVariable("text2", e.target.value);
                    queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY, TEXT2_USE_QUEY_KEY] })
                }}
            />
        </>
    );
}
```
