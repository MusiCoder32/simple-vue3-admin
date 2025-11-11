export const menusStore = defineStore('menusStore', () => {
    const menus = ref([])

    const pathLabelMap = ref({})
    const pathFull = ref([])
    const pathLabelArr = computed(() => {
        const arr = []
        pathFull.value.forEach((item) => {
            const key = item.split('?')[0]
            arr.push(pathLabelMap.value[key])
        })
        return arr
    })
    return { menus, pathLabelMap, pathFull, pathLabelArr }
})
