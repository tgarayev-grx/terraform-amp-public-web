import { ParsedOperation } from "@/lib/openapi/types";
import { ArrowDownLeftIcon } from "@grx/ui/icons/ArrowDownLeft";
import { ArrowUpRightIcon } from "@grx/ui/icons/ArrowUpRight";

type ApiReferenceMethodBadgeProps = {
  method: ParsedOperation["method"];
};

export const ApiReferenceMethodBadge = ({
  method,
}: ApiReferenceMethodBadgeProps) => {
  switch (method) {
    case "get": {
      return (
        <div className="flex justify-center items-center bg-success-lighter-100 border border-success-light-200 rounded text-success-base-600">
          <ArrowDownLeftIcon className="w-5 h-5" />

          <span className="pt-0.5 pr-1.5 text-body-sm-medium uppercase">
            GET
          </span>
        </div>
      );
    }
    case "post": {
      return (
        <div className="flex justify-center items-center bg-info-muted-50 border border-info-light-200 rounded text-info-base-600">
          <ArrowUpRightIcon className="w-5 h-5" />

          <span className="pt-0.5 pr-1.5 text-body-sm-medium uppercase">
            POST
          </span>
        </div>
      );
    }
    case "put": {
      return (
        <div className="flex justify-center items-center bg-warning-lighter-100 border border-warning-light-200 rounded text-warning-base-600">
          <ArrowUpRightIcon className="w-5 h-5" />

          <span className="pt-0.5 pr-1.5 text-body-sm-medium uppercase">
            PUT
          </span>
        </div>
      );
    }
    case "patch": {
      return (
        <div className="flex justify-center items-center bg-warning-lighter-100 border border-warning-light-200 rounded text-warning-base-600">
          <ArrowUpRightIcon className="w-5 h-5" />

          <span className="pt-0.5 pr-1.5 text-body-sm-medium uppercase">
            PATCH
          </span>
        </div>
      );
    }
    case "delete": {
      return (
        <div className="flex justify-center items-center bg-error-lighter-100 border border-error-light-200 rounded text-error-base-600">
          <ArrowUpRightIcon className="w-5 h-5" />

          <span className="pt-0.5 pr-1.5 text-body-sm-medium uppercase">
            DELETE
          </span>
        </div>
      );
    }
  }
};

ApiReferenceMethodBadge.displayName = "ApiReferenceMethodBadge";
