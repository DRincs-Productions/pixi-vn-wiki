# Using pause in *ink*

After executing a # script the system does a [go next](/start/labels-flow.md#next-step) to move to the next steps. For example in this case you will see the image and the dialogue text.

```ink
=== start ===
# image add "image" /image.jpg
Hello, world!
-> DONE
```

You can use the `pause` to stop the execution of the steps and set the dialogue text to empty.

The syntax is as follows:

`#` + `pause`

```ink
=== start ===
# image add "image" /image.jpg
# pause
Hello, world!
-> DONE
```
