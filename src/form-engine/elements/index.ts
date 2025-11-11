const modules = import.meta.glob('./*/index.ts', { eager: true })
const elements = {}
for (const path in modules) {
    const data = modules[path].default

    if (data) {
        elements[data.initialValues.component] = data
    }
}
export default elements
