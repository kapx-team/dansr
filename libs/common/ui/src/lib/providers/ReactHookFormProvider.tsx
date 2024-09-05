"use client";

import { FormProvider } from "react-hook-form";

export function ReactHookFormProvider(props: {
    children: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    methods: any;
}) {
    return <FormProvider {...props?.methods}>{props?.children}</FormProvider>;
}
