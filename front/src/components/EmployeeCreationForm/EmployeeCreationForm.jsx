import React from 'react'

import './EmployeeCreationForm.scss'

export default function EmployeeCreationForm() {





    return (
        <div className='form-wrapper'>
            <form
                action=""
                onSubmit={(e) => e.preventDefault()}

                className='form' >
                <label htmlFor="firstName">First name</label>
                <input
                    id='firstName'
                    className='form__input firstName'
                    type="text" />

                <label htmlFor="lastName">Last name</label>
                <input
                    id='lastName'
                    className='form__input lastName'
                    type="text" />

                <label htmlFor="birthDate">Date of birth</label>
                <input
                    id='birthDate'
                    className='form__input birthDate'
                    type="date" />

                <label htmlFor="startDate">Start date</label>
                <input
                    id='startDate'
                    className='form__input startDate'
                    type="date" />


                <fieldset
                    className='form__fieldset'

                >
                    <legend>Address</legend>

                    <label htmlFor="street">Street</label>
                    <input
                        id='street'
                        className='form__input street'
                        type="text" />

                    <label htmlFor="city">City</label>
                    <input
                        id='city'
                        className='form__input city'
                        type="text" />

                    <label htmlFor="state">State</label>
                    <select
                        id='state'
                        className='form__input state'
                    >
                        <option disabled selected>Choose a state</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>


                    </select>

                    <label htmlFor="zipCode">Zip code</label>
                    <input
                        id='zipCode'
                        className='form__input zipCode'
                        type="text" />

                    {/* <label htmlFor="country">Country</label>
                    <input
                        id='country'
                        className='form__input country'
                        type="text" /> */}

                </fieldset>


                <label htmlFor="department">Department</label>
                {/* <input
                    id='department'
                    className='form__input department'
                    type="text"
                    list="departments" />

                <datalist id="departments">
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Engineering">Finance</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Legal">Legal</option>                   
                </datalist> */}
                <select
                    className='form__input department'
                    id="department">
                    <option disabled selected>Choose a department</option>
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Engineering</option>
                    <option>Legal</option>
                </select>


                <button
                    className='form__button'
                    type="submit"


                >Save</button>



            </form>



        </div>
    )
}

