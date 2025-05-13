# Use input prompt in *ink*

The ***ink* + Pixi’VN integration** introduces the a # script that allows you to request an [input prompt](/start/input.md) from the user.

The syntax is as follows:

`#` + `[operation]` + `input` + `[parameters]`

Where:

* `#`: It is a special character used by ***ink* syntax** for use a special script.
* `[operation]`: It is the operation that you want to execute with the input prompt. The available operations are:
  * `request`: Request an input prompt.
* `input`: It is the keyword that indicates that you want to request an input prompt.
* `[parameters]` (Optional): It is the parameters of the operation. The syntax for adding parameters is as follows: `property1` + `value1` + `property2` + `value2` + `...`. If the value is a string and contains spaces, you must use double quotes.
The available parameters are:
  * `type` (Optional): It is the type of the value that you want to request. You can use any string of your choice. You can use this value to get more information about the type of value that is requested.
  * `default` (Optional): It is the default value of the input prompt.

The value will be saved in storage with the following system key `SYSTEM_RESERVED_STORAGE_KEYS.CURRENT_INPUT_VALUE_MEMORY_KEY`, that is `_input_value_`. So you can access the value with `_input_value_`.

Example:

```ink
// this is used to avoid the ink error, because the variable is not defined
VAR _input_value_ = ""

=== start ===
Hello
# request input type string // [!code focus]
What is your name?
My name is { _input_value_ }
# request input type number default 18 // [!code focus]
How old are you?
I am { _input_value_ } years old
# request input type "html textarea" // [!code focus]
Describe who you are:
{ _input_value_ }
Restart
-> DONE
```

<sandbox
  template="fvg9l6"
  entry="/src/ink/start.ink"
/>
