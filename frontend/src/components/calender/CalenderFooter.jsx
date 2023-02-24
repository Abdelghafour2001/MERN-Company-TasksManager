import { useSelector } from 'react-redux';
import { countAsignedTotalHours } from '../../constance/helpers';

const CalenderFooter = ({taskList, setTaskLists}) => {
	const { shifts } = useSelector(state => state.shift);
	const { taskLists } = useSelector(state => state.task);

    const startDate = new Date (useSelector(state => state.local.time.startDate));
    const fromDate = new Date (useSelector(state => state.local.time.fromDate));
    const toDate = new Date (useSelector(state => state.local.time.toDate));
    const dateControl = useSelector(state => state.local.time.dateControl);

	const filterTaskLists = (taskLists, i) => {
		const filteredTaskLists = taskLists?.filter(
			(taskList) => 
				(( 
					taskList.frequency === "weekly" &&
					taskList.repeat.includes(
						(new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()+i)).toLocaleDateString('en-US', {weekday: 'long'}).toLowerCase()
					)
				) ||
				( 
					taskList.frequency === "monthly" &&
					taskList.repeat.includes(
						(new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()+i)).toLocaleDateString('en-US', {day: 'numeric'})
					)
				) ||
				(
					taskList.frequency === "daily"
				))
		) || [];

		return filteredTaskLists;
	}

	return (
	<div className="section-container footer-row">
		<div className="section-row flex">
			<div className="section-title flex align-center">
				<div className="section-content w-100 flex align-between">
					<div>
						Assigned Total
					</div>
					<div>
						{countAsignedTotalHours(shifts, dateControl === 'day' ? startDate : null, fromDate, toDate)}
					</div>
				</div>
			</div>
			{dateControl !== "day" ? (
				[...Array(
					dateControl === "week" ?
						7 
					: dateControl === "2week" ?
						14
					: dateControl === "4week" ?
						28
					: null
				).keys()].map((i) => {
					return (
						<div key={`footer-row-${i}`} className={`col section-holder${taskList.index === i ? ' bg-primary' : ''}`}>
							<div 
								className="shift flex h-100 align-center"
								onClick={() => {
									taskList.index === i ?
										setTaskLists({index: null, items: []})
									:
										setTaskLists({
											index: i,
											items: filterTaskLists(taskLists, i)
										})
								}}
							>
								{ taskLists && filterTaskLists(taskLists, i)?.map((taskList) => 
									<div 
										key={`footer-row-${i}-${taskList._id}`} 
										className="badge"
										style={{
											backgroundColor: taskList.color,
										}}
									/>
								)}
							</div>
						</div>
					)
				})
				) : (
					[...Array(24).keys()].map((i) => {
						return (
							<div key={`footer-row-${i}`} className="col section-holder">
								<div className="shift flex h-100 align-center">
									{ i }
								</div>
							</div>
						)
					})
				)}
		</div>
	</div>
	)
}

export default CalenderFooter