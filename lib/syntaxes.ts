import type { LanguageInput } from "@shikijs/types";

export const inkLanguage: LanguageInput = {
    name: "ink",
    scopeName: "source.ink",
    patterns: [
        {
            include: "#comments",
        },
        {
            include: "#todo",
        },
        {
            include: "#choices",
        },
        {
            include: "#multilineBlocks",
        },
        {
            include: "#conditionalBlocks",
        },
        {
            include: "#conditionalChoices",
        },
        {
            include: "#conditionalText",
        },
        {
            include: "#variableText",
        },
        {
            include: "#printingVariables",
        },
        {
            include: "#functionDeclarations",
        },
        {
            include: "#knotDeclarations",
        },
        {
            include: "#knots",
        },
        {
            include: "#glue",
        },
        {
            include: "#alternatives",
        },
        {
            include: "#gathers",
        },
        {
            include: "#declarations",
        },
        {
            include: "#tildeLogic",
        },
    ],
    repository: {
        comments: {
            patterns: [
                {
                    name: "comment.line.double-slash.ink",
                    match: "//.*$",
                },
                {
                    name: "comment.block.ink",
                    begin: "/\\*",
                    end: "\\*/",
                },
            ],
        },
        todo: {
            patterns: [
                {
                    name: "keyword.other.todo.ink",
                    match: "\\bTODO:.*$",
                },
            ],
        },
        choices: {
            patterns: [
                {
                    name: "keyword.other.choice.ink",
                    match: "^\\s*([\\*\\+]\\s*)+",
                },
            ],
        },
        gathers: {
            patterns: [
                {
                    name: "keyword.other.gather.ink",
                    match: "^\\s*-(?!\\s*>)(\\s*-)*",
                },
            ],
        },
        knots: {
            patterns: [
                {
                    name: "keyword.control.return.ink",
                    match: "(?<=->\\s*)(END|DONE)",
                },
                {
                    name: "keyword.other.knot.ink",
                    match: "=+",
                },
                {
                    name: "entity.name.function.ink",
                    match: "(?<=->\\s*)[a-zA-Z0-9_]+(?:\\.[a-zA-Z0-9_]+)?",
                },
                {
                    name: "keyword.other.divert.ink",
                    match: "->",
                },
                {
                    name: "meta.function.call.ink",
                    begin: "(?<=->\\s*[a-zA-Z0-9_]+)\\s*\\(",
                    end: "\\)",
                    patterns: [
                        {
                            include: "#knots",
                        },
                        {
                            include: "#logic",
                        },
                    ],
                },
            ],
        },
        knotDeclarations: {
            patterns: [
                {
                    name: "meta.knot.declaration.ink",
                    begin: "^(=+)\\s*",
                    beginCaptures: {
                        "1": {
                            name: "keyword.other.knot.ink",
                        },
                    },
                    end: "\\s*(=*)$",
                    endCaptures: {
                        "1": {
                            name: "keyword.other.knot.ink",
                        },
                    },
                    patterns: [
                        {
                            name: "entity.name.function.ink",
                            match: "[a-zA-Z0-9_]+",
                        },
                        {
                            name: "meta.function.parameters.ink",
                            begin: "\\(",
                            end: "\\)",
                            patterns: [
                                {
                                    include: "#logic",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        functionDeclarations: {
            patterns: [
                {
                    name: "meta.function.declaration.ink",
                    begin: "^(=+)(\\s*)(function)(\\s+)",
                    beginCaptures: {
                        "1": {
                            name: "keyword.other.knot.ink",
                        },
                        "3": {
                            name: "keyword.other.function.ink",
                        },
                    },
                    end: "$",
                    patterns: [
                        {
                            name: "entity.name.function.ink",
                            match: "[a-zA-Z0-9_]+",
                        },
                        {
                            name: "meta.function.parameters.ink",
                            begin: "\\(",
                            end: "\\)",
                            patterns: [
                                {
                                    include: "#logic",
                                },
                            ],
                        },
                        {
                            name: "keyword.other.knot.ink",
                            match: "=+(?=\\s*$)",
                        },
                    ],
                },
            ],
        },
        glue: {
            patterns: [
                {
                    name: "keyword.other.glue.ink",
                    match: "<>",
                },
            ],
        },
        variableText: {
            patterns: [
                {
                    name: "meta.brace.curly.variableText.ink",
                    begin: "(?<!\\\\)\\{(?=[^}]*\\|)",
                    beginCaptures: {
                        "0": {
                            name: "keyword.other.ink",
                        },
                    },
                    end: "(?<!\\\\)\\}",
                    endCaptures: {
                        "0": {
                            name: "keyword.other.ink",
                        },
                    },
                    patterns: [
                        {
                            name: "keyword.other.ink",
                            match: "(?<=\\{)\\s*[&!~]",
                        },
                        {
                            name: "keyword.other.ink",
                            match: "(?<!\\\\)\\|",
                        },
                        {
                            include: "#knots",
                        },
                        {
                            include: "#glue",
                        },
                        {
                            include: "#choices",
                        },
                    ],
                },
            ],
        },
        conditionalChoices: {
            patterns: [
                {
                    name: "meta.brace.curly.conditionalChoice.ink",
                    begin: "(?<=^\\s*[\\*\\+]\\s*)\\{(?=[^\\n}]*\\})",
                    end: "\\}",
                    patterns: [
                        {
                            include: "#logic",
                        },
                    ],
                },
            ],
        },
        conditionalText: {
            patterns: [
                {
                    name: "meta.brace.curly.conditionalText.ink",
                    begin: "(?<!\\\\)\\{(?=[^\\n}]*:)",
                    end: "(?<!\\\\)\\}",
                    patterns: [
                        {
                            name: "meta.conditional.condition.ink",
                            begin: "(?<=\\{)\\s*",
                            end: ":",
                            patterns: [
                                {
                                    include: "#logic",
                                },
                            ],
                        },
                        {
                            name: "keyword.operator.ternary.ink",
                            match: ":",
                        },
                        {
                            name: "meta.conditional.text.ink",
                            begin: "(?<=:)",
                            end: "(?=\\})",
                            patterns: [
                                {
                                    name: "keyword.other.alternative.ink",
                                    match: "(?<!\\\\)\\|",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        conditionalBlocks: {
            patterns: [
                {
                    name: "meta.conditional.block.ink",
                    begin: "(?<!\\\\)\\{(?=[^}]*\\n)",
                    end: "\\s*\\}",
                    patterns: [
                        {
                            name: "meta.conditional.firstline.no-dash.ink",
                            begin: "(?<=\\{)\\s*(-)?\\s*(?!(->))",
                            beginCaptures: {
                                "1": {
                                    name: "keyword.other.conditional.ink",
                                },
                            },
                            end: "$",
                            patterns: [
                                {
                                    include: "#logic",
                                },
                                {
                                    name: "keyword.other.conditional.ink",
                                    match: ":",
                                },
                            ],
                        },
                        {
                            name: "meta.conditional.branch.ink",
                            begin: "^(?!\\s*->)(\\s*-\\s*)(else)?",
                            beginCaptures: {
                                "1": {
                                    name: "keyword.other.conditional.ink",
                                },
                                "2": {
                                    name: "keyword.control.else.ink",
                                },
                            },
                            end: ":",
                            endCaptures: {
                                "0": {
                                    name: "keyword.other.conditional.ink",
                                },
                            },
                            patterns: [
                                {
                                    include: "#logic",
                                },
                            ],
                        },
                        {
                            name: "text.plain.ink",
                            patterns: [
                                {
                                    include: "#tildeLogic",
                                },
                                {
                                    include: "#knots",
                                },
                                {
                                    include: "#glue",
                                },
                                {
                                    include: "#choices",
                                },
                                {
                                    include: "#comments",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        multilineBlocks: {
            patterns: [
                {
                    name: "meta.multiline.block.ink",
                    begin: "(?<!\\\\)\\{\\s*(stopping|shuffle(?:\\s+(?:once|stopping))?|cycle|once)\\s*:",
                    beginCaptures: {
                        "1": {
                            name: "keyword.other.multiline-type.ink",
                        },
                    },
                    end: "\\s*\\}",
                    patterns: [
                        {
                            name: "meta.multiline.line.ink",
                            begin: "^\\s*-\\s*",
                            beginCaptures: {
                                "0": {
                                    name: "keyword.other.multiline-line.ink",
                                },
                            },
                            end: "$",
                            patterns: [
                                {
                                    include: "#tildeLogic",
                                },
                                {
                                    include: "#knots",
                                },
                                {
                                    include: "#glue",
                                },
                                {
                                    include: "#choices",
                                },
                                {
                                    include: "#comments",
                                },
                            ],
                        },
                        {
                            match: ".+",
                            name: "text.plain.ink",
                            patterns: [
                                {
                                    include: "#tildeLogic",
                                },
                                {
                                    include: "#knots",
                                },
                                {
                                    include: "#glue",
                                },
                                {
                                    include: "#choices",
                                },
                                {
                                    include: "#comments",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        printingVariables: {
            patterns: [
                {
                    name: "meta.printing.variable.ink",
                    begin: "(?<!\\\\)\\{",
                    beginCaptures: {
                        "0": {
                            name: "keyword.other.ink",
                        },
                    },
                    end: "(?<!\\\\)\\}",
                    endCaptures: {
                        "0": {
                            name: "keyword.other.ink",
                        },
                    },
                    patterns: [
                        {
                            include: "#logic",
                        },
                    ],
                },
            ],
        },
        logic: {
            patterns: [
                {
                    name: "keyword.control.return.ink",
                    match: "\\breturn\\b",
                },
                {
                    name: "storage.type.temp.ink",
                    match: "\\btemp\\b",
                },
                {
                    name: "variable.other.local.ink",
                    match: "(?<=\\btemp\\s+)[a-zA-Z_][a-zA-Z0-9_]*",
                },
                {
                    name: "keyword.operator.arithmetic.ink",
                    match: "\\+|-|\\*|/|%|\\bmod\\b",
                },
                {
                    name: "keyword.operator.comparison.ink",
                    match: "==|!=|<=|>=|<|>|\\?",
                },
                {
                    name: "constant.language.boolean.ink",
                    match: "\\b(not|or)\\b",
                },
                {
                    name: "support.function.math.ink",
                    match: "\\b(POW|RANDOM|INT|FLOOR|FLOAT)\\b",
                },
                {
                    name: "constant.language.boolean.ink",
                    match: "\\b(true|false)\\b",
                },
                {
                    name: "constant.numeric.ink",
                    match: "\\b\\d+(?:\\.\\d+)?\\b",
                },
                {
                    name: "string.quoted.double.ink",
                    begin: '"',
                    end: '"',
                    patterns: [
                        {
                            name: "constant.character.escape.ink",
                            match: "\\\\.",
                        },
                        {
                            include: "#variableText",
                        },
                        {
                            include: "#printingVariables",
                        },
                    ],
                },
                {
                    name: "entity.name.function.ink",
                    match: "\\b[a-zA-Z_][a-zA-Z0-9_]*(?=\\s*\\()",
                },
                {
                    name: "variable.other.global.ink",
                    match: "\\b[a-zA-Z_][a-zA-Z0-9_]*\\b",
                },
            ],
        },
        alternatives: {
            patterns: [
                {
                    name: "keyword.other.alternative.ink",
                    match: "(?<!\\\\)\\|",
                },
            ],
        },
        declarations: {
            patterns: [
                {
                    name: "meta.declaration.ink",
                    begin: "^\\s*(VAR|CONST)\\b",
                    beginCaptures: {
                        "1": {
                            name: "storage.type.var.ink",
                        },
                        "2": {
                            name: "storage.type.const.ink",
                        },
                    },
                    end: "$",
                    patterns: [
                        {
                            name: "variable.other.global.ink",
                            match: "(?<=VAR\\s+)[a-zA-Z_][a-zA-Z0-9_]*",
                        },
                        {
                            name: "variable.other.constant.ink",
                            match: "(?<=CONST\\s+)[a-zA-Z_][a-zA-Z0-9_]*",
                        },
                        {
                            name: "keyword.operator.assignment.ink",
                            match: "=",
                        },
                        {
                            begin: "(?<=\\=)",
                            end: "$",
                            patterns: [
                                {
                                    include: "#knots",
                                },
                                {
                                    include: "#logic",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        tildeLogic: {
            patterns: [
                {
                    name: "meta.tilde.logic.ink",
                    begin: "~",
                    beginCaptures: {
                        "0": {
                            name: "keyword.other.tilde.ink",
                        },
                    },
                    end: "$",
                    patterns: [
                        {
                            include: "#logic",
                        },
                    ],
                },
            ],
        },
    },
};
