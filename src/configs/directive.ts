import router from '../router'
export default {
    install(app) {
        app.directive('throttle', {
            mounted: (el, binding) => {
                let throttleTime = binding.value
                if (!throttleTime) {
                    throttleTime = 1000
                }
                let timer
                el.addEventListener(
                    'click',
                    (event) => {
                        if (!timer) {
                            timer = setTimeout(() => {
                                timer = null
                            }, throttleTime)
                        } else {
                            event && event.stopImmediatePropagation()
                        }
                    },
                    true,
                )
            },
        })

        app.directive('debounce', {
            mounted: (el, binding) => {
                let debounceTime = binding.value
                if (!debounceTime) {
                    debounceTime = 500
                }
                let timer
                el.addEventListener(
                    'click',
                    (event) => {
                        if (!timer) {
                            timer = setTimeout(() => {
                                timer = null
                            }, debounceTime)
                        } else {
                            event && event.stopImmediatePropagation()
                            clearTimeout(timer)
                            timer = setTimeout(() => {
                                timer = null
                            }, debounceTime)
                        }
                    },
                    true,
                )
            },
        })

        app.directive('has', {
            mounted: function (el, binding) {
                const { value } = binding
                if (typeof value !== 'string' || value === '') {
                    return
                }
                // 获取按钮权限
                const permissions: any[] = (router.currentRoute.value.meta.permissions as any[]) || []
                let permission
                for (let i = 0; i < permissions.length; i++) {
                    const item = permissions[i]
                    if (item.path === value) {
                        permission = item
                        break
                    }
                }
                if (!permission) {
                    el.style.display = 'none'
                }
            },
        })
        app.directive('disabled', {
            mounted: function (el, binding) {
                const { value } = binding
                // 获取按钮权限
                const permissions: any[] = (router.currentRoute.value.meta.permissions as any[]) || []
                let permission
                for (let i = 0; i < permissions.length; i++) {
                    const item = permissions[i]
                    if (item.path === value) {
                        permission = item
                        break
                    }
                }
                if (!permission) {
                    el.style.opacity = '0.6'
                    el.addEventListener(
                        'click',
                        (event) => {
                            event && event.stopImmediatePropagation()
                        },
                        true,
                    )
                }
            },
        })
    },
}
