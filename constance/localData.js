import { taskListIcon, fullCalenderIcon, ticketIcon, userIcon, briefcaseIcon, bookIcon } from './icons';

const hours = [ '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00' ];

const hoursArray = [
    '00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45', '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45'
]

const customSelectStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'var(--text-light)' : '#var(--text-dark)',
        transition: 'var(--transition-duration)',
        padding: 15,
        background: state.isSelected ? 'var(--color-primary)' : 'var(--color-main)',
        fontWeight: state.isSelected ? '600' : 'normal',
        cursor: 'pointer',
    }),
    control: () => ({
        border: '2px solid var(--dark)',
        background: 'var(--color-main)',
        fontWeight: '600',
        display: 'flex',
        height: '35px',
        borderRadius: 'var(--border-radius)',
        // boxShadow: 'var(--box-shadow)',
        cursor: 'pointer',
        transition: 'var(--transition-duration)',
        // width: 200,
        width: '100%',
        minWidth: '110px',
        fontFamily: 'inherit',
        '&:hover': {
            background: 'var(--dark)',
            color: 'var(--text-light)',
            boxShadow: 'var(--box-shadow)',
        },
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        const color = state.isSelected ? 'var(--text-light)' : '#var(--text-dark)';

        return { ...provided, opacity, transition, color };
    }
}

const customSelectModalStyles = {
    option: (provided, state) => ({
        ...provided,
        background: state.isSelected ? 'var(--color-primary)' : 'var(--color-main)',
        transition: 'var(--transition-duration)',
        fontFamily: 'inherit',
        '&:hover': {
            background: 'var(--color-primary)',
            color: "var(--text-light)",
        },
    }),
    control: (provided, state) => ({
        ...provided,
        background: 'transparent',
        fontWeight: '600',
        display: 'flex',
        border: 'none',
        borderBottom: state.isSelected ? '2px solid var(--color-primary)' : '2px solid var(--color-secondary)',
        minHeight: '41px',
        borderRadius: '0',
        cursor: 'pointer',
        fontFamily: 'inherit',
        width: '100%',
        transition: 'var(--transition-duration)',
        '&:hover': {
            borderBottom: '2px solid var(--color-primary)',
            color: "var(--text-light)",
            boxShadow: 'var(--box-shadow)',
        },
        '&:focus': {
            outline: 'none',
            boxShadow: 'none',
        },
        '&:active': {
            outline: 'none',
            boxShadow: 'none',
        },
    }),
    singleValue: (provided, state) => {
        const transition = 'opacity 300ms';
        const color = 'var(--text-dark)';

        return { ...provided, transition, color };
    }
}

const timeframeOptions = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: '2week', label: '2 Week' },
    { value: '4week', label: '4 Week' },
];

const weekDaySelectOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
];

const positions = [
    'Owner',
    'Director',
    'Manager',
    'Barista',
    'Bartender',
    'Kitchen',
    'Cashier',
    'Server',
    'Busser',
    'Host',
    'Cook',
    'Team Lead',
    'Chef',
    'Cooridnator',
    'Catering',
    'Assistant',
    'Cleaning',
    'Security',
    'Other',
    'Co-Owner',
    'Co-Director',
    'Co-Manager',
    'Associate',
    'Co-Barista',
    'Co-Bartender',
    'Co-Kitchen',
    'Kitchen Manager',
    'Accountant',
    'Mechanic',
    'Sales',
    'Supervisor',
    'Shift Lead',
    'Shift Manager',
    'Driver',
    'Delivery',
    'Waiter/Waitress',
    'CIO',
];

const userSideNavLinks = [
    {
        link: '/user/schedule', 
        label: 'Schedule', 
        icon: fullCalenderIcon
    },
    {
        link: '/user/tickets',
        label: 'Tickets',
        icon: ticketIcon
    },
    {
        link: '/user/tasks',
        label: 'Tasks',
        icon: taskListIcon
    },
    {
        link: '/user/profile', 
        label: 'Profile',
        icon: userIcon
    },
    {
        link: '/user/training', 
        label: 'Training',
        icon: bookIcon
    },
];

const dashboardSideNavLinks = [
    {
        link: '/dashboard/shifts', 
        label: 'Open Shifts', 
        icon: fullCalenderIcon
    },
    {
        link: '/dashboard/tickets',
        label: 'Tickets',
        icon: ticketIcon
    },
    {
        link: '/dashboard/tasks',
        label: 'Tasks',
        icon: taskListIcon
    },
    {
        link: '/dashboard/businesses',
        label: 'Businesses',
        icon: briefcaseIcon
    },
    {
        link: '/dashboard/training', 
        label: 'Training',
        icon: bookIcon
    },
];

export { 
    hours, 
    hoursArray,
    customSelectStyles, 
    timeframeOptions,
    positions,
    customSelectModalStyles,
    userSideNavLinks,
    dashboardSideNavLinks,
    weekDaySelectOptions
};