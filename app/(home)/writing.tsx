import { Writing } from "@/app/(home)/writing.client";
import { ServerCodeBlock } from "@/components/server-code-block";
import { inkLanguage } from "@/lib/syntaxes";

export function AnybodyCanWrite() {
    return (
        <Writing
            tabs={{
                writer: (
                    <ServerCodeBlock
                        code={`=== start ===
# show image bg bg01-hallway
# show imagecontainer james [m01-body m01-eyes-smile m01-mouth-neutral01] xAlign 0.5 yAlign 1 with movein direction right
james: You're my roommate's replacement, huh?
# request input
What is your name?
# rename mc {_input_value_}
* [Nice to meet you!]
    -> nice_meeting
* [I'd rather not say.]
    -> silent_response

=== nice_meeting ===
james: Nice to meet you, [mc]!
-> END

=== silent_response ===
james: ...Suit yourself.
-> END`}
                        lang="ink"
                        langs={[inkLanguage]}
                    />
                ),
                developer: (
                    <ServerCodeBlock
                        code={`import { mc } from "@/content/characters";
import { moveIn, narration, newChoiceOption, newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start", [
    async () => {
        await showImage("bg", "bg01-hallway");
        await moveIn(
            "james",
            {
                value: ["m01-body", "m01-eyes-smile", "m01-mouth-neutral01"],
                options: { xAlign: 0.5, yAlign: 1 },
            },
            { direction: "right" },
        );
        narration.dialogue = { character: "james", text: "You're my roommate's replacement, huh?" };
    },
    () => {
        narration.dialogue = "What is your name?";
        narration.requestInput();
    },
    (props) => {
        mc.name = narration.inputValue as string;
        narration.choices = [
            newChoiceOption("Nice to meet you!", "nice_meeting", props),
            newChoiceOption("I'd rather not say.", "silent_response", props),
        ];
    },
]);
newLabel("nice_meeting", [
    () => (narration.dialogue = { character: "james", text: \`Nice to meet you, \${mc.name}!\` }),
]);
newLabel("silent_response", [
    () => (narration.dialogue = { character: "james", text: \`...Suit yourself.\` }),
]);`}
                        lang="ts"
                    />
                ),
                automation: (
                    <ServerCodeBlock
                        code={`{
  "$schema": "https://pixi-vn.com/schemas/latest/schema.json",
  "labels": {
    "start_|_c-0": [
      {
        "labelToOpen": {
          "label": "nice_meeting",
          "type": "jump"
        }
      }
    ],
    "start_|_c-1": [
      {
        "labelToOpen": {
          "label": "silent_response",
          "type": "jump"
        }
      }
    ],
    "start": [
      {
        "goNextStep": true,
        "operations": [
          {
            "type": "image",
            "operationType": "show",
            "alias": "bg",
            "url": "bg01-hallway",
            "$origin": "show image bg bg01-hallway"
          }
        ]
      },
      {
        "goNextStep": true,
        "operations": [
          {
            "type": "operationtoconvert",
            "values": [
              "show imagecontainer james [m01-body m01-eyes-smile m01-mouth-neutral01] xAlign 0.5 yAlign 1 with movein direction right"
            ]
          }
        ]
      },
      {
        "dialogue": "james: You're my roommate's replacement, huh?"
      },
      {
        "goNextStep": true,
        "operations": [
          {
            "type": "input",
            "operationType": "request",
            "$origin": "request input"
          }
        ]
      },
      {
        "dialogue": "What is your name?"
      },
      {
        "goNextStep": true,
        "operations": [
          {
            "type": "operationtoconvert",
            "values": [
              "rename mc ",
              {
                "type": "value",
                "storageOperationType": "get",
                "storageType": "storage",
                "key": "_input_value_"
              }
            ]
          }
        ]
      },
      {
        "choices": [
          {
            "text": "Nice to meet you!",
            "label": "start_|_c-0",
            "props": {},
            "type": "call",
            "oneTime": true
          },
          {
            "text": "I'd rather not say.",
            "label": "start_|_c-1",
            "props": {},
            "type": "call",
            "oneTime": true
          }
        ]
      }
    ],
    "nice_meeting": [
      {
        "dialogue": "james: Nice to meet you, [mc]!"
      },
      {
        "end": "game_end"
      }
    ],
    "silent_response": [
      {
        "dialogue": "james: ...Suit yourself."
      },
      {
        "end": "game_end"
      }
    ]
  },
  "initialOperations": []
}`}
                        lang="json"
                    />
                ),
            }}
        />
    );
}
