import React from 'react';
import styles from './Backup.module.css';
import { withSnackbar } from 'notistack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import AddIcon from "@material-ui/icons/Add";
import BackupService from '../../../services/backupService';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CreateBackupDialog from './CreateBackupDialog';
import RestoreBackupDialog from './RestoreBackupDialog';

class Backup extends React.Component {

    state = {
        data: [],
        showForm: false,
        showRestoreDialog: false,
        backupToRestore: { name: "", date: null },
    }

    async fetchData() {
        let response = await BackupService.getBackups();
        this.setState({ data: response.data });
    }

    componentWillMount() {
        this.fetchData();
    }

    async createBackup() {
        await BackupService.createBackup();
        this.fetchData();
        this.setState({ showForm: false });
    }

    async restoreBackup() {
        let response = await BackupService.restoreBackup(this.state.backupToRestore.name)
        this.setState({ showRestoreDialog: false })
        if (response.status !== 200) {
            this.props.enqueueSnackbar('error while restoring backup', { variant: 'error' });
            for (let line of response.data.split('\n').filter(str => str.length > 1)) {
                this.props.enqueueSnackbar(line, { variant: 'error' });
            }
        }
        for (let line of response.data.split('\n').filter(str => str.length > 1)) {
            this.props.enqueueSnackbar(line, { variant: 'info' });
        }
        this.props.enqueueSnackbar(`Restored state from ${this.state.backupToRestore.name}`, { variant: 'info' });
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <header>
                    MAKERSPACE
                </header>

                <List
                    subheader={
                        <ListSubheader component="div">
                            <IconButton onClick={this.props.history.goBack}>
                                <BackIcon />
                            </IconButton>
                            Backups
                            <Tooltip className={styles.button} title={"Create new"}>
                                <IconButton onClick={() => this.setState({ showForm: true })}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </ListSubheader>}
                    component="nav"
                    className={styles.list}
                    aria-label="Contacts">
                    {this.state.data.map((row, idx) => {
                        return <ListItem button
                            key={idx}
                            onClick={() => { this.setState({ showRestoreDialog: true, backupToRestore: row }) }}>
                            <ListItemText primary={row.name} secondary={new Date(row.date).toLocaleDateString(undefined, {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })} />
                        </ListItem>
                    })}
                </List>

                <CreateBackupDialog
                    onAccept={this.createBackup.bind(this)}
                    onDeny={() => { this.setState({ showForm: false }) }}
                    open={this.state.showForm}
                />
                <RestoreBackupDialog
                    onAccept={this.restoreBackup.bind(this)}
                    onDeny={() => { this.setState({ showRestoreDialog: false }) }}
                    open={this.state.showRestoreDialog}
                    name={this.state.backupToRestore.name}
                    date={this.state.backupToRestore.date}
                />

            </div>
        );
    };
}

export default withSnackbar(Backup);