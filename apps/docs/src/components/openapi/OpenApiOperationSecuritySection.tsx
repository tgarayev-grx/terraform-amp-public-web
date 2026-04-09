import type { ParsedOpenApi, ParsedOperation } from "@/lib/openapi/types";
import { resolveOperationSecurity } from "@/lib/openapi/resolve-operation-security";
import { OpenApiOperationChip } from "./OpenApiOperationDocChip";

type OpenApiOperationSecuritySectionProps = {
  operation: ParsedOperation;
  doc: ParsedOpenApi;
};

export function OpenApiOperationSecuritySection({
  operation,
  doc,
}: OpenApiOperationSecuritySectionProps) {
  const resolvedSecurity = resolveOperationSecurity(operation, doc);

  if (!resolvedSecurity.length) return null;

  return (
    <section className="flex flex-col gap-6 mb-10">
      <h2 className="border-stroke-soft-200 pb-3 border-b text-text-strong-1000 text-title-md-semibold">
        Authorization
      </h2>

      <div className="flex flex-col gap-3">
        {resolvedSecurity.map((security) => {
          return (
            <div
              key={`${security.key}-${(security.scopes ?? []).join(",")}`}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-wrap items-center gap-2">
                <code className="font-fira-code font-medium text-[14px]/[20px] text-text-strong-1000">
                  {security.name ?? security.key}
                </code>

                {security.in && (
                  <>
                    <OpenApiOperationChip variant="text">
                      string
                    </OpenApiOperationChip>

                    <OpenApiOperationChip variant="text">
                      {security.in}
                    </OpenApiOperationChip>
                  </>
                )}

                {security.required && (
                  <OpenApiOperationChip variant="danger">
                    required
                  </OpenApiOperationChip>
                )}
              </div>

              {security.description ? (
                <div>
                  <span className="text-body-md-regular text-text-subtle-700">
                    {security.description}
                  </span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

OpenApiOperationSecuritySection.displayName = "OpenApiOperationSecuritySection";
