/** HTML id for deep-linking to an operation section (must be document-unique). */
export function operationSectionId(operationId: string): string {
  return `op-${operationId.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
}
