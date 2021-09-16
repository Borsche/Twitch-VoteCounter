import Pollvote from './poll-votes';
import PollResult from './poll-result';
import PollOption from './poll-option';

export default class Poll {

    private static instance: Poll;

    private options: PollOption[] = [];
    private votes: Pollvote[] = [];
    private pollOverFunction: Function;
    private pollUpdateFunction: Function;
    private active: boolean;

    constructor() {}

    public static getInstance(): Poll {
        if(!Poll.instance) {
            Poll.instance = new Poll();
          }
  
          return Poll.instance;
    }

    public setOptions(options: PollOption[]) {
        this.options = options;
    }

    public getOptions(): PollOption[] {
        return this.options;
    }

    public setActive(bool: boolean) {
        this.active = bool;
    }

    public isActive(): boolean {
        return this.active;
    }

    public addVote(vote: Pollvote) {
        //if the person already voted just update the vote
        let founduser = false;
        if(this.votes.filter((vo) => {
            if(vo.username == vote.username) {
                console.log("User already voted.. rewriting vote");
                founduser = true;
                vo.vote = vote.vote;
            }
        }))
        if(founduser == false){
            console.log("user not found.. pushing new vote");
            this.votes.push(vote);
        }
        this.triggerPollUpdate();
    }

    public resetPoll() {
        this.votes = [];
        this.triggerPollUpdate();
    }

    public onPollClosed(func: Function) {
        this.pollOverFunction = func;
    }

    private triggerPollClosed() {
        this.pollOverFunction();
    }

    public onPollUpdate(func: Function) {
        this.pollUpdateFunction = func;
    }

    private triggerPollUpdate() {
        console.log("triggering Poll update");
        this.pollUpdateFunction(this.getResult());
    }

    public getResult(): PollResult[] {
        let pollResults: PollResult[] = [];

        // create the pollResult object
        this.options.forEach(option => {
            pollResults.push({
                option: option,
                votes: 0
            });
        })

        this.votes.forEach(vote => {
            pollResults.forEach((result) => {
                if(result.option.value == vote.vote) {
                    result.votes += 1;
                }
            })
        })

        return pollResults;
    }
}