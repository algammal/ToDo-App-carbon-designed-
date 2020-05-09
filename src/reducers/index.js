import {ADD_REMINDER ,REMOVE_REMINDER, CLEAR_REMINDER} from '../types'
const reminder = (state=[],action) =>{
    let reminders =null;
    if(action.type=== ADD_REMINDER ){
        reminders=[...state ,{text:action.text,date:action.date,id: Math.random()}]
        console.log("from reducers",reminders)
        return reminders
    }else if(action.type===REMOVE_REMINDER){
        reminders= state.filter(reminder => reminder.id !== action.id)
        return reminders
    }else if(action.type===CLEAR_REMINDER){
        reminders=[]
        return reminders
    }
    else{
        return state
    }
}

export default reminder;
