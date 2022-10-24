import {Directive} from 'vue'
import {useStringUtils} from "@/composition"


export const vNumbers: Directive<HTMLElement> = {
  mounted(el: HTMLElement) {
    const {onlyNumbers} = useStringUtils()
    el.addEventListener('input',(e:Event)=>{
    const $input = e.target as HTMLInputElement

  $input.value = onlyNumbers($input.value)  
  const maxNumbers = $input.attributes.getNamedItem("maxNum")
  if(maxNumbers){
    console.log(maxNumbers?.value);
    
   const maxLength = parseInt(maxNumbers.value,10)
      if($input.value.length > maxLength) $input.value = $input.value.slice(0,maxLength-1)
  }

    })
  }
}