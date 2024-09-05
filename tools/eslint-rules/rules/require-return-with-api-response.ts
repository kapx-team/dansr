// @ts-nocheck

/**
 * This file sets you up with structure needed for an ESLint rule.
 *
 * It leverages utilities from @typescript-eslint to allow TypeScript to
 * provide autocompletions etc for the configuration.
 *
 * Your rule's custom logic will live within the create() method below
 * and you can learn more about writing ESLint rules on the official guide:
 *
 * https://eslint.org/docs/developer-guide/working-with-rules
 *
 * You can also view many examples of existing rules here:
 *
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules
 */

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

// NOTE: The rule will be available in ESLint configs as "@nx/workspace-require-return-with-api-response"
export const RULE_NAME = "require-return-with-api-response";

export const rule = ESLintUtils.RuleCreator(() => __filename)({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: `Ensure apiResponseHandler functions are used with a return statement`,
            recommended: "error",
        },
        schema: [],
        fixable: "code",
        messages: {
            requireReturn:
                "apiResponseHandler.{{ functionName }} must be used as part of a return statement.",
        },
    },
    defaultOptions: [],
    create(context) {
        const FUNCTION_PROPERTIES = [
            "success",
            "serverError",
            "clientError",
            "authError",
            "rateLimitError",
        ];
        return {
            ExpressionStatement(node: TSESTree.ExpressionStatement) {
                const { expression } = node;

                if (
                    expression.type === "CallExpression" &&
                    expression.callee.type === "MemberExpression" &&
                    expression.callee.object.type === "Identifier" &&
                    expression.callee.object.name === "apiResponseHandler" &&
                    FUNCTION_PROPERTIES.includes(
                        expression.callee.property.name
                    )
                ) {
                    context.report({
                        node,
                        messageId: "requireReturn",
                        data: {
                            functionName: expression.callee.property.name,
                        },
                        fix(fixer) {
                            const sourceCode = context.getSourceCode();
                            const text = sourceCode.getText(expression);
                            return fixer.replaceText(node, `return ${text};`);
                        },
                    });
                }
            },
            CallExpression(node: TSESTree.CallExpression) {
                if (
                    node.callee.type === "MemberExpression" &&
                    node.callee.object.type === "Identifier" &&
                    node.callee.object.name === "apiResponseHandler" &&
                    FUNCTION_PROPERTIES.includes(node.callee.property.name)
                ) {
                    const parent = node.parent;
                    if (parent.type !== "ReturnStatement") {
                        context.report({
                            node,
                            messageId: "requireReturn",
                            data: {
                                functionName: node.callee.property.name,
                            },
                            fix(fixer) {
                                const sourceCode = context.getSourceCode();
                                const text = sourceCode.getText(node);
                                return fixer.replaceText(
                                    node,
                                    `return ${text};`
                                );
                            },
                        });
                    }
                }
            },
        };
    },
});
