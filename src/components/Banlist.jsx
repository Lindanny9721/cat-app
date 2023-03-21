const banList = ({list, removeBan}) => {
    return (
        <div className="right-container">
            <h3>Ban List</h3>
            <ul>
            {list && list.length > 0 ? (
                list.map((ban, index) => {
                    return (
                        <li key={index}>
                            <button onClick={() => removeBan(ban)}>{ban}</button>
                        </li>
                        
                    )
                })
            ) : (
                <div>
                    <h3>No Bans!</h3>
                </div>
            )}
            </ul>
        </div>
    )
}
export default banList 