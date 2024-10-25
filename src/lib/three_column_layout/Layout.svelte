<div class="left">
  <slot name="left" />
</div>
<div class="main">
  <slot name="main" />
</div>
<div class="right">
  <slot name="right" />
</div>

<style>
  div {
    float: left;
  }

  .left {
    width: 25%;
    height: 100vh;
    overflow: scroll;
    padding: 8px;
  }
  .main {
    width: 50%;
  }
  .right {
    width: 25%;
    height: 100vh;
    overflow: scroll;
    padding: 8px;
  }
</style>
