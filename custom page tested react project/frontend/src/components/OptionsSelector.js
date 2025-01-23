import React from "react"

const OptionsSelector = ({ options, setOptions }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <div>
      <div className="row w-100 mt-5">
        <h5 className="col-md-6">Power adapter</h5>
        <select
          name="powerAdapter"
          id="power_adapter"
          className="col-md-6"
          value={options.powerAdapter}
          onChange={handleChange}
        >
          <option value="UK / IRELAND 230V">UK / IRELAND 230V</option>
          <option value="EUROPE 230V">EUROPE 230V</option>
          <option value="USA / CANADA 120V">USA / CANADA 120V</option>
          <option value="AUSTRALIA / NZ 230V">AUSTRALIA / NZ 230V</option>
          <option value="JAPAN 100V">JAPAN 100V</option>
        </select>
      </div>
      <div className="row w-100 mt-3">
        <h5 className="col-md-6">Backboard shape</h5>
        <select
          name="backboardShape"
          id="backboard_shape"
          className="col-md-6"
          value={options.backboardShape}
          onChange={handleChange}
        >
          <option value="1">Cut Around Acrylic: Hang/Wall-mount</option>
          <option value="2">Rectangle Acrylic: Hang/Wall-mount</option>
          <option value="3">Cut To Letter: Hang/Wall-mount +21$</option>
        </select>
      </div>
      <div className="d-flex checkboxes w-100 mt-5">
        <div className="check customcb">
          <input
            type="checkbox"
            checked={options.bumperSale}
            id="bumper_sale"
            name="bumperSale"
            onChange={handleChange}
          />
          <label className="inner" htmlFor="bumper_sale"></label>
        </div>
        <h5 className="mla-4">
          <label htmlFor="bumper_sale">
            <b>Free</b> Bumper Sale: Remote and Dimmer
          </label>
        </h5>
      </div>
      <div className="d-flex checkboxes w-100 mt-3">
        <div className="check customcb">
          <input type="checkbox" checked={options.hanging} id="hanging" name="hanging" onChange={handleChange} />
          <label className="inner" htmlFor="hanging"></label>
        </div>
        <h5 className="mla-4 ">
          <label htmlFor="hanging">Sign Hanging chain Kit $15</label>
        </h5>
      </div>
      <div className="d-flex checkboxes w-100 mt-3">
        <div className="check customcb">
          <input
            type="checkbox"
            checked={options.wallMounting}
            id="wall_mounting"
            name="wallMounting"
            onChange={handleChange}
          />
          <label className="inner" htmlFor="wall_mounting"></label>
        </div>
        <h5 className="mla-4">
          <label htmlFor="wall_mounting">Sign Wall Mounting Kit $15</label>
        </h5>
      </div>
    </div>
  )
}

export default OptionsSelector

