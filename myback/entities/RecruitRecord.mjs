import RecruitBase from './RecruitBase.mjs'

export default class RecruitRecord extends RecruitBase {
    constructor({id, ...rest }={}) {
        super(rest)
        
        this.id = id
    }
}