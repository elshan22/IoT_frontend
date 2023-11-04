import React from 'react';
import {SettingsPane, SettingsPage, SettingsContent, SettingsMenu} from 'react-settings-pane'

function ProfileSetting(props) {
    let settings = {
        'mysettings.general.name': 'Username',
        'mysettings.general.color-theme': 'purple',
        'mysettings.general.email': 'dstuecken@react-settings-pane.com',
        'mysettings.general.picture': 'earth',
        'mysettings.profile.firstname': 'Dennis',
        'mysettings.profile.lastname': 'a',
    };

    // Define your menu
    const menu = [
        {
            title: 'General',          // Title that is displayed as text in the menu
            url: '/settings/general'  // Identifier (url-slug)
        },
        {
            title: 'Profile',
            url: '/settings/profile'
        }
    ];

    // Define one of your Settings pages
    const dynamicOptionsForProfilePage = [
        {
            key: 'mysettings.general.email',
            label: 'E-Mail address',
            type: 'text',
        },
        {
            key: 'mysettings.general.password',
            label: 'Password',
            type: 'password',
        }
    ];

    // Save settings after close
    const leavePaneHandler = (wasSaved, newSettings, oldSettings) => {
        // "wasSaved" indicates wheather the pane was just closed or the save button was clicked.

        if (wasSaved && newSettings !== oldSettings) {
            // do something with the settings, e.g. save via ajax.
        }
    };

    const settingsChanged = (changedSettings) => {
        // this is triggered onChange of the inputs
    };

    // Return your Settings Pane
    return (
        <SettingsPane items={menu} index="/settings/general" settings={settings} onPaneLeave={leavePaneHandler}>
            <SettingsContent closeButtonClass="secondary" saveButtonClass="primary" header={true}>
                <SettingsPage handler="/settings/general">
                    <fieldset className="form-group">
                        <label form="profileName">Name: </label>
                        <input type="text" className="form-control" name="mysettings.general.name" placeholder="Name" id="general.ame" onChange={settingsChanged} defaultValue={settings['mysettings.general.name']} />
                    </fieldset>
                    <fieldset className="form-group">
                        <label form="profileColor">Role: </label>
                        <input type="text" className="form-control" name="mysettings.general.lastname" placeholder="Name" id="general.ame" onChange={settingsChanged} defaultValue={settings['mysettings.general.lastname']} />
                    </fieldset>
                </SettingsPage>

            </SettingsContent>
        </SettingsPane>
    )
}

export default ProfileSetting;