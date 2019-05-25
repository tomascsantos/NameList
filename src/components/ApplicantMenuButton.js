import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import IconButton from "@material-ui/core/es/IconButton/IconButton";

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

function ApplicantMenuButton() {
    return (
        <WithState>
            {({ anchorEl, updateAnchorEl }) => {
                const open = Boolean(anchorEl);
                const handleClose = () => {
                    updateAnchorEl(null);
                };

                return (
                    <React.Fragment>
                        <IconButton>
                            <MoreVertIcon
                                aria-owns={open ? 'render-props-menu' : undefined}
                                aria-haspopup="true"
                                onClick={event => {
                                    updateAnchorEl(event.currentTarget);
                                }}
                            />
                        </IconButton>
                        <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={handleClose}>Delete Applicant</MenuItem>
                            <MenuItem onClick={handleClose}>Edit Applicant</MenuItem>
                        </Menu>
                    </React.Fragment>
                );
            }}
        </WithState>
    );
}

export default ApplicantMenuButton;