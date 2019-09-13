 <template>

 </template>
<script>
export default {
  name:'mapTable',
  props: ['tableData'],
  data() {
    return {
            columnsData: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '经度',
                        key: 'lon'
                    },
                    {
                        title: '纬度',
                        key: 'lat'
                    },
                    {
                        title: '备注',
                        key: 'message'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ]
            }
    },
    methods: {
       show (index) {
                this.$Modal.info({
                    title: '详细信息',
                    content: `经度：${this.tableData[index].lon}<br>纬度：${this.tableData[index].lat}<br>备注信息：${this.tableData[index].message}`
                })
            },
    remove (index) {
                this.tableData.splice(index, 1);
            }, 
    },
}
</script>
<style lang="stylus" scoped>

</style>