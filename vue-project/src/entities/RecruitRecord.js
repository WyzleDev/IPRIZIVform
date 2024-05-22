import RecruitBase from './RecruitBase'

export default class RecruitRecord extends RecruitBase {
    constructor({id, ...rest }={}) {
        super(rest)
        
        this.id = id
    }
}