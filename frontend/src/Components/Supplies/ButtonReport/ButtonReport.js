import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ReportIcon from "@material-ui/icons/LibraryBooks";

class ButtonReport extends React.Component {

  render() {

    return (
        <Tooltip 
          title="Show reports"
          placement="bottom-start">
          <IconButton onClick={this.props.onClick}>
            <ReportIcon />
          </IconButton>
        </Tooltip>
    );
  }

}

ButtonReport.defaultProps = {
  onClick : () => void(0),
}

export default ButtonReport;