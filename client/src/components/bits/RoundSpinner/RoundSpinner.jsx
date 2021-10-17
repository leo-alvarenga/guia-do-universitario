import localStyles from "./RoundSpinner.style";

const RoundSpinner = (props) => {
    const localClasses = localStyles();

    const getSize = () => {
        if (!props.size) {
            return localClasses.RoundSpinnerMedium;
        }

        switch (props.size) {
            default:
                return localClasses.RoundSpinnerMedium;
        }
    };

    return (
        <div className={localClasses.RoundSpinnerMedium}></div>
    );
};

export default RoundSpinner;