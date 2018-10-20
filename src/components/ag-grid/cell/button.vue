<template>
    <div
        v-if="buttons"
        class="cell-button"
    >
        <jvi-button
            class="cell-jvi-button"
            v-for="(config,key) in buttons"
            :config="config"
            :params="buttonParams"
            :key="key"
        />
    </div>
</template>
<script>
export default {
    created() {
    },
    data () {
        return {
        }
    },
    computed: {
        data() {
            return this.params.data
        },
        value() {
            return this.params.value
        },
        config() {
            return this.params.colDef.hasOwnProperty('floatingFilterComponentParams')? this.params.colDef.floatingFilterComponentParams: {}
        },
        refName() {
            return this.config.refName
        },
        buttonParams() {
            return {
                ref: this.refName,
                data: this.data,
                value: this.value
            }
        },
        buttons() {
            let buttons = []
            let display = (button)=>{
                let status
                if (button.hasOwnProperty('statusKey')) {
                    status = this.data[button.statusKey]
                }else if(this.data.hasOwnProperty('status')){
                    status = this.data.status
                }
                // 初始化按钮显示
                if (button.hasOwnProperty('show')) {
                    if (!button.show.includes(status)) {
                        return false
                    }
                }
                if (button.hasOwnProperty('hide')) {
                    if (button.hide.includes(status)) {
                        return false
                    }
                }
                return true
            }
            this.config.params.buttons.map((button) => {
                // 默认按钮自提大小
                if (!button.hasOwnProperty('size')) {
                    button.size = 'small'
                }

                let newButton = JSON.parse(JSON.stringify(button))
                newButton.display = display(button)
                delete newButton.status
                delete newButton.show
                delete newButton.hide
                buttons.push(newButton)
            });
            return buttons;
        },
    },
    methods: {
    },
    mounted() {
    }
}
</script>
<style lang="scss" scoped>
    .cell-button{
        margin-top: 5px;
        >.cell-jvi-button{
            margin: 0px 5px 5px 0px;
        }
    }
</style>
