<template>
    <el-scrollbar class="pt4 h-full bg-white" :style="expand ? 'min-width: 200px; max-width: 200px' : null">
        <div class="mb4 pr4 w-full" flex="~ justify-between items-center">
            <el-input
                v-if="expand"
                class="ml4 h-9 !w-40 grow"
                v-model="filterText"
                :placeholder="$t('common.inputText')"
                suffix-icon="Search" />
            <!-- <el-icon color="white" size="20"> -->
            <el-icon size="18" class="ml4" @click="expand = !expand" color="#303133">
                <Expand v-if="!expand" />
                <Fold v-else />
            </el-icon>
        </div>
        <el-menu
            @select="menuSelect"
            :default-openeds="defaultOpeneds"
            :default-active="defaultActive"
            :collapse="!expand">
            <MenuTree :tree="currentMenus" />
        </el-menu>
    </el-scrollbar>
</template>

<script lang="tsx" setup>
import { formatRouter } from '@/utils/menus'
import { menusStore } from '@/stores/menus'
import { usersStore } from '@/stores/usersStore'
import { demoMenus } from '@/router/router-map'

const emits = defineEmits(['select'])

const { menuList } = storeToRefs(usersStore())

const expand = ref(true)
import { cloneDeep } from 'lodash'

const router = useRouter()
const route = useRoute()
const { menus, pathLabelMap, pathFull } = storeToRefs(menusStore())

const defaultActive = ref('')
const defaultOpeneds = ref([])
const filterText = ref('')

const currentMenus = computed(() => {
    if (!filterText.value) {
        return menus.value
    } else {
        const arr = cloneDeep(menus.value)
        const notParentArr = []
        const result = arrFilter(arr, filterText.value, notParentArr)
        return [...result, ...notParentArr]
    }
})

watch(
    route,
    () => {
        if (route.meta.title) {
            defaultActive.value = route.path
            //<--设置菜单默认展开
            const tempArr = route.fullPath.split('/')
            tempArr.shift() //会产生一个空无素,需丢掉
            defaultOpeneds.value = []
            if (tempArr.length > 1) {
                for (let i = 0; i < tempArr.length - 1; i++) {
                    defaultOpeneds.value.push('/' + tempArr.slice(0, i + 1).join('/'))
                }
            }
            pathFull.value = [...defaultOpeneds.value, defaultActive.value]
            //设置菜单默认展开-->
        }
    },
    {
        immediate: true,
    },
)

onMounted(() => {
    setMenus()
})

function menuSelect(path, a, b, c) {
    console.log(path, a, b, c)
    emits('select', path)
}

function arrFilter(arr, filterStr, notParentArr) {
    return arr.filter((item) => {
        let label = $t(item.label)
        const filterResult = label.indexOf(filterStr) > -1
        //不对匹配到的菜单的子菜单的过滤
        //匹配到的没有父级菜单的了菜单,提升到最外层
        if (item.children?.length && !filterResult) {
            const result = arrFilter(item.children, filterStr, notParentArr)
            notParentArr.push(...result)
        }
        return filterResult
    })
}

function MenuTree(props) {
    let result = props.tree.map((item) => {
        if (item?.children?.length > 0) {
            return (
                <el-sub-menu index={item.path} key={item.path} show-timeout={0} hide-timeout={0}>
                    {{
                        default() {
                            return MenuTree({ tree: item.children })
                        },
                        title() {
                            return (
                                <>
                                    {item.icon ? <svg-icon class="font-size-4.5" name={item.icon} /> : null}
                                    {expand.value ? (
                                        <span v-ell class={item.icon ? 'pl2.5' : 'pl4.5'}>
                                            {item.name}
                                        </span>
                                    ) : null}
                                </>
                            )
                        },
                    }}
                </el-sub-menu>
            )
        } else {
            return (
                <el-menu-item index={item.path} key={item.path}>
                    {{
                        default: () => {
                            return item.icon ? <svg-icon class="font-size-4.5" name={item.icon} /> : null
                        },
                        title: () => (
                            <span v-ell class={item.icon ? 'pl2.5' : 'pl4.5'}>
                                {item.name}
                            </span>
                        ),
                    }}
                </el-menu-item>
            )
        }
    })
    return result
}

async function setMenus() {
    try {
        const data = cloneDeep(menuList.value)

        if (import.meta.env.MODE === 'development') {
            data.unshift(...demoMenus)
        }
        if (data?.length > 0) {
            const result = formatRouter(data)
            menus.value = result.menu
            pathLabelMap.value = result.pathLabelMap

            // 动态设置路由
            let defaultRoute = '/404' //目前仅生效于没有任何权限的情况
            for (let i = 0; i < result.router.length; i++) {
                // 设置重定向，防止默认的重定向路径无权限
                let item = result.router[i]
                if (i === 0) {
                    defaultRoute = `${item.path}`
                    router.addRoute({
                        name: 'root',
                        path: '/',
                        component: () => import('./index.vue'),
                        redirect: defaultRoute,
                        children: [item],
                    })
                } else {
                    router.addRoute('root', item)
                }
            }

            //用于覆盖route.ts中已配置置的not-found路由
            //项目初始化时应该跳转到根/路径，这样才能进入到menu.vue中
            //进入到menu.vue进行重组路由后，此时让无法匹配的路由，跳转到404
            router.addRoute({
                name: 'not-found',
                path: '/:pathMatch(.*)*',
                redirect: '/404',
            })
            // await router.push(sessionStorage.getItem('historyRouter') || defaultRoute) //保留url参数
            await router.push({ path: sessionStorage.getItem('historyRouter') || defaultRoute }) //不保留url参数
        }
    } catch (e) {
        console.log(e)
    }
}
</script>

<style lang="scss" scoped></style>
