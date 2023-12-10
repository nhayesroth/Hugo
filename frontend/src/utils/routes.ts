export const Routes = Object.freeze({
    index: "/",
    application: "/application/:id"
});

export function getApplicationRoute(id: string | number) {
    return `/application/${id}`;
}