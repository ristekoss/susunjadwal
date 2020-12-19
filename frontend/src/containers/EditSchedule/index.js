import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

const EditSchedule = () => {
    const { scheduleId } = useParams();
    return (
        <Fragment>
            <Helmet title="Edit Jadwal" />
            <div style={{ color: 'white' }} >Hai, ini jadwal {scheduleId}</div>
        </Fragment>

    )
}

export default EditSchedule;