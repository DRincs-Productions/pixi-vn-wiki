# _ink_ variables

As explained in the [official documentation](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md#part-3-variables-and-logic) of the **_ink_ language**:

_**ink**_ also supports variables, both temporary and global, storing numerical and content data, or even story flow commands. It is fully-featured in terms of logic, and contains a few additional structures to help keep the often complex logic of a branching story better organised.

In the **_ink_ + Pixi’VN integration**, the variables `VAR` and `CONST` are equivalent to [variables in storage](/start/storage.md). And the variables `temp` are equivalent to [temporary variables in storage](/start/storage.md#temporary-storage).

Just like in **native _ink_** you can use variables in dialogs or `scripts that start with #`.

The name of the _**ink**_ variables corresponds to the key of a variable in the [storage](/start/storage.md).

So For example, if you have the following _**ink**_ code:

```ink
VAR myVariable = 42
```

You can access the variable `myVariable` in the [storage](/start/storage.md) with the following code:

```typescript
import { storage } from '@drincs/pixi-vn'

const myVariable = storage.getVariable<number>("myVariable");
```

Or vice versa, if you have the following code:

```typescript
import { storage } from '@drincs/pixi-vn'

storage.setVariable("myDuration", 42);
```

You can access the variable `myDuration` in the _**ink**_ code with the following code:

```ink
// this is used to avoid the ink error, because the variable is not defined
VAR myDuration = 0

=== start ===
The value of myDuration is: {myDuration}
# show image bg /image.png dissolve duration {myDuration}
-> DONE
```
