export const usersStore = defineStore('usersStore', () => {
    const userInfo = ref([])
    const roleList = ref([])
    const menuList = ref([])
    const currGatewayIpSource = ref()

    return { userInfo, roleList, menuList, currGatewayIpSource }
})
