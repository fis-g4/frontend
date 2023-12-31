interface Data {
    id: string;
    sender: string;
    receivers: string[];
    subject: string;
    message: string;
    date: string;
    has_been_opened: boolean[];
    deleted_by_sender: boolean;
    deleted_by_receiver: boolean[];
}

function createData(
    id: string,
    sender: string,
    receivers: string[],
    subject: string,
    message: string,
    date: string,
    has_been_opened: boolean[],
    deleted_by_sender: boolean,
    deleted_by_receiver: boolean[],
): Data {
    return { id, sender, receivers, subject, message, date, has_been_opened, deleted_by_sender, deleted_by_receiver };
}

export const rows = [
    createData('0',
        'johndoe', 
        ['user2', 'user3', 'user4', 'user5', 'user6', 'user7'],
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
        'message1', 
        '2020-01-01',
        [false, false, false, false, false, false],
        false,
        [false, false, false, false, false, false]),
        createData('0',
        'user1', 
        ['johndoe', 'user3', 'user4', 'user5', 'user6', 'user7'],
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
        'message1', 
        '2020-01-01',
        [false, false, true, false, true, false],
        false,
        [true, false, true, false, true, false]),
        createData('0',
        'user1', 
        ['user2', 'user3', 'user4', 'user5', 'user6', 'user7'],
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
        'message1', 
        '2020-01-01',
        [true, false, true, false, true, false],
        false,
        [true, false, true, false, true, false]),
];