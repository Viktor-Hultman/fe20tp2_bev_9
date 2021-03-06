import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

import styled from 'styled-components';




const ColorSettingsCard = styled.div`
background-color: ${props => props.theme.card};
border-radius: 10px;
padding: 10px;
margin: 10px;
color: ${props => props.theme.txt};

`
const SelectedColorList = styled.div`
list-style:none;
`
const ColorDropDwn = styled.select`
padding: 5px 10px;
border: none;
margin: 5px;
border-radius: 4px;
background-color: #f1f1f1;
cursor: pointer;
`


const ColorPresets = ({ firebase }) => {

    const [selectedColor, setSelectedColor] = useState("Standard")

    let imgs = [
        "https://i.imgur.com/3orcm3Z.png",
        "https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/amazon-logo.png",
        "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png"
    ];

    let { uid } = useContext(AuthUserContext);

    //Function for setting the color preset to the users firebase profile
    const setColor = (value, name) => {
        firebase.user(uid).child('settings').child('colorPreset')
            .set({ [value]: name })
    }

    //Function for setting the logo url to the users firebase profile
    const setLogo = (value, url) => {
        firebase.user(uid).child('settings').child('logoPreset')
            .set ({ [value]: url })
    }
        
    //Function that triggers the above functions and providing parameters depending on what value the user has selected in the drop down menu
    const ColorChange = (evt) => {
       if (evt.target.value === "Standard") {
            setColor("Standard" , "Standard")
            setLogo("Standard", imgs[0])

       } else if (evt.target.value === "Amazon") {
            setColor("Amazon" , "Amazon")
            setLogo("AmazonLogo", imgs[1])

       } else if (evt.target.value === "Tesla") {
            setColor("Tesla" , "Tesla")
            setLogo("TeslaLogo", imgs[2])
       }
    }

    useEffect(() => {
        const unsubscribe = firebase.user(uid).child('settings').child('colorPreset')
            .on('value', snapshot => {
                if (snapshot) {
                    const colorObject = snapshot.val();
                    if (colorObject) {
                        let colorArray = Object.values(colorObject)
                        setSelectedColor(colorArray);
                    } else {
                        setSelectedColor("Standard");
                    }
                }
            });
        return () => {
            unsubscribe();
        }
      
    }, []);


    return(
        <div>
            <ColorSettingsCard>
                <h3> Here you can select prefered color preset</h3>
                <SelectedColorList>
                    <li>Your selected color preset: {selectedColor}</li>
                </SelectedColorList>
                <ColorDropdown ColorChange={ColorChange}/>
                <br/>
            </ColorSettingsCard>
        </div>
    )
}

const ColorDropdown = ({ColorChange}) => (
    <form>  
        <label htmlFor="Color Presets">Select Color</label>
        <br/>
        <ColorDropDwn defaultValue={'DEFAULT'} name="Color Presets" onChange={ColorChange}>
            <option value="DEFAULT" disabled>Select a preset</option>
            <option value="Standard"> Standard </option> 
            <option value="Amazon"> Amazon </option>
            <option value="Tesla"> Tesla </option>
        </ColorDropDwn>
    </form>
)




export default (withFirebase(ColorPresets));