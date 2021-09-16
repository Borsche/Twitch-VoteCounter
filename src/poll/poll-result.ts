import PollOption from './poll-option';

export default interface PollResult {
    option: PollOption;
    votes: number;
}