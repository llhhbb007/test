<template>
   <div class="main">
     <div style="display: flex;justify-content: center">
       <div style="margin-right: 20px" @click="upClick">《</div>
       <div>{{FullYear}}年</div>
       <div style="margin-left: 20px" @click="nextClick">》</div>
     </div>
     <div class="center">
       <div class="info" v-for="item in Month">
         <div class="title">{{FullYear+'年'+item+'月'}}</div>
         <div class="calender">
           <div class="calender-title" v-for="i in week">{{i}}</div>
           <div class="calender-title" v-for="i in new Date(FullYear,item-1,1).getDay()"></div>
           <div class="calender-item" v-for="(i,index) in getDaysInOneMonth(FullYear,item)"
                :data-value="FullYear+','+item+','+i" @click="dayClick" :key="index"
                style="background-color: #fff;color: #333">{{i}}
           </div>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
    export default {
        name: "calender",
        model: {
          prop: 'value',
          event: 'event'
        },
        props: {
          value: {
            type: Array,
          },
        },
        data(){
            return{
              tableShow:true,
              FullYear:new Date().getFullYear(),
              Month:[1,2,3,4,5,6,7,8,9,10,11,12],
              week:['日','一','二','三','四','五','六'],
              blank:0
            }
        },
        created(){
        },
        mounted(){
          if(this.value){
            if(document.querySelectorAll('.calender-item')){
              document.querySelectorAll('.calender-item').forEach(i =>{
                if(this.value.includes(i.dataset.value)){
                  i.style.backgroundColor = 'rgb(0, 182, 240)'
                  i.style.color = '#fff'
                }
              })
            }
          }
        },
        watch:{
          FullYear(){
            this.$nextTick(function(){
              document.querySelectorAll('.calender-item').forEach(i =>{
                if(this.value.includes(i.dataset.value)){
                  i.style.backgroundColor = 'rgb(0, 182, 240)'
                  i.style.color = '#fff'
                }else {
                  i.style.backgroundColor = '#fff'
                  i.style.color = '#333'
                }
              })
            })
          }
        },
        methods:{
          //切换年
          upClick(){
            this.FullYear--
          },
          nextClick(){
            this.FullYear++
          },
          //获取选择的日期
          dayClick(e){
            if(e.target.style.backgroundColor === 'rgb(0, 182, 240)'){
              this.value.splice(this.value.indexOf(e.target.dataset.value), 1)
              this.$emit('event', this.value);
              e.target.style.backgroundColor = '#fff'
              e.target.style.color = '#333'
            }else {
              this.value.push(e.target.dataset.value)
              this.$emit('event', this.value);
              e.target.style.backgroundColor = 'rgb(0, 182, 240)'
              e.target.style.color = '#fff'
            }
          },
          //根据年月获取天数
          getDaysInOneMonth(year, month){
              let d = new Date(year, month, 0);
              return d.getDate();
          },
        }
    }
</script>

<style scoped>
  .main{
    width: 960px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
.center{
  width: 950px;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: center;
}
.info{
  width: 210px;
  height: 240px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 5px 15px;
  margin: 5px -1px -1px 0px;
}
.title{
  width: 950px;
  text-align: center;
  margin-left: -4px;
}
.calender{
  width: 200px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.calender-title{
  width: 25px;
  height: 25px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px -1px -1px 0px;
}
.calender-item{
  width: 25px;
  height: 25px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px -1px -1px 0px;
  cursor:pointer;
}
.calender-hover:hover{
  background-color: rgb(0, 182, 240) !important;
  color: #fff!important;
}
</style>
