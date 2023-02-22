export const loadingStr = "loading";
export type LoadingStr = typeof loadingStr;

export function isLoading(v: any) {
    return v === loadingStr;
}