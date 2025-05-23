<template>
  <div class="testimonial-card">
    <img :src="image" :alt="`Photo of ${name}`" class="testimonial-image"/>
    <div class="testimonial-content">
      <div class="quote-icon">❝</div>
      <p class="testimonial-text">{{ text }}</p>
      <p class="testimonial-name">{{ name }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.testimonial-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  gap: 1rem;
  max-width: 800px;
  padding-right: 1rem;
}

.testimonial-image {
  border-radius: 8px;
  height: 100%;
}

.testimonial-content {
  flex: 1;
  position: relative;
}

.quote-icon {
  box-shadow: 0px 0px 1px 0px rgba(56, 54, 48, 0.10) inset;
  position: absolute;
  top: 50%;
  left: -2.5rem;
  transform: translate(0, -50%);
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  color: #bbb;
  background-color: white;
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.testimonial-text {
  margin-left: 1rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 12px;
  font-weight: bold;
}

.testimonial-name {
  margin-left: 1rem;
  font-size: 0.95rem;
  color: #666;
}
</style>