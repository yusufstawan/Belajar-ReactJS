import styles from "./Tombol.module.css"

const Tombol = (props) => {
    const handleButtonClick = () => {
        props.onTombolClick(props.children)
    }

    return (
        <button className={styles.tombol} onClick={handleButtonClick} style={{ margin: "10px" }}>
            {props.children}
        </button>
    )
}

export default Tombol;
