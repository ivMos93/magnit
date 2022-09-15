import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        items: [
            {
                name: 'Название',
                date: '01.06.2017',
                status: 'Не активный',
            },
            {
                name: 'Название',
                date: '02.06.2017',
                status: 'Не активный',
            },
            {
                name: 'Название',
                date: '03.06.2017',
                status: 'Не активный',
            }
        ]
    }),
    getters: {
        // doubleCount: (state) => state.count * 2,
    },
    actions: {
        // increment() {
        //     this.count++
        // },
    }
})