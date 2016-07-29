import { Pipe, PipeTransform } from "@angular/core"


@Pipe({name : 'filter' , pure: true})
export class filterArrayPipe implements PipeTransform{
  transform(value, args:any = []){
    if(!args[0]) {
      console.log("no search")
      return value;
    } else if(value) {
      console.log("yes search")
      return value.filter( item => {
        for (let key in item){
          console.log(key)
          if((typeof item[key] === 'string' || item[key] instanceof String) &&
          (item[key].indexOf(args[0]) !== -1)) {
            console.log(args)
             return true;
          }
        }
      });
    }
  }
}
