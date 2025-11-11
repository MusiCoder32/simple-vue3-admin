import router from '@/router'
export function networkClick() {
    router.push({
        path: '/redirect/background/authority/network',
        query: {
            messageInfo: JSON.stringify({ optionType: 'add' }),
        },
    })
}
