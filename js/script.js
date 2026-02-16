// ===== Tabs data =====
    const TAB = {
      cross: {
        chips: ["Optical RS", "Earth-Style Injection", "Segmentation + MIM"],
        title: "CrossEarth",
        tagline: "A geospatial vision foundation model designed for domain-generalizable remote sensing semantic segmentation.",
        steps: [
          ["Earth-Style Injection", "Inject field-style embeddings into in-domain training imagery to broaden the training distribution towards unseen domains."],
          ["Multi-Task Training", "Jointly optimize semantic segmentation and masked image modeling to learn robust representations under cross-domain shifts."],
          ["Geospatial Semantics", "Use lightweight geospatial semantic extraction and cross-attention injection to reinforce geospatial cues throughout the backbone."]
        ],
        callout: "Designed to bridge gaps across region, spectral bands, platform, and climate—without seeing the target domain during training."
      },
      adapter: {
        chips: ["PEFT", "Frequency Subspaces", "Artifact Mitigation"],
        title: "Earth-Adapter",
        tagline: "A parameter-efficient fine-tuning method for remote sensing segmentation that mitigates pervasive artifacts via frequency-guided adapters.",
        steps: [
          ["Divide (DFT)", "Decompose features into low- and high-frequency components to isolate artifact-related signals."],
          ["Conquer (MoA)", "Optimize spatial/LF/HF subspaces with a Mixture of Adapters and aggregate corrected features via a router."],
          ["Fuse (Skip + Scaling)", "Combine refined features with the frozen backbone via skip connections and learnable scaling for stable adaptation."]
        ],
        callout: "A “divide-and-conquer” PEFT design that stays lightweight while improving robustness on RS segmentation benchmarks."
      },
      sar: {
        chips: ["SAR", "Sparse MoE", "Physics-Guided Routing"],
        title: "CrossEarth-SAR",
        tagline: "A SAR-centric billion-scale geospatial foundation model with physics-guided sparse MoE, built for domain generalization semantic segmentation.",
        steps: [
          ["Physical Descriptors", "Compute stable, physically grounded cues (e.g., imaging geometry, speckle strength, texture roughness) to guide routing."],
          ["Token-Level Sparse MoE", "Route tokens to a small set of experts to scale capacity while keeping compute per image manageable."],
          ["CrossEarth-SAR-200K + DG Suite", "Pre-train on a large unified SAR dataset and evaluate on a standardized multi-gap DG benchmark suite."]
        ],
        callout: "Built to confront extreme SAR domain fragmentation across sensors, bands, polarization, and regions."
      },
      gate: {
        chips: ["Cross-Modal", "Gating", "Optical"],
        title: "CrossEarth-Gate",
        tagline: "A cross-modal gating module for unified optical geospatial perception.",
        steps: [
          ["Bridge Modalities", "Introduce gates that learn how much information to exchange across optical representations."],
          ["Stabilize Fusion", "Control cross-modal feature flow to avoid overfitting to any single sensor or acquisition condition."],
          ["Unify the Series", "Serve as a lightweight connector within the CrossEarth Series for flexible deployment."]
        ],
        callout: "Connects optical branches within the CrossEarth Series, enabling flexible deployment across single- and multi-modal setups."
      }
    };

    const panel = document.getElementById("tab-panel");
    const buttons = Array.from(document.querySelectorAll(".tabbtn"));

    function renderPanel(key, animate=true){
      const data = TAB[key];

      // build HTML
      const chips = data.chips.map(c => `<span class="chip"><span class="dot"></span>${c}</span>`).join("");
      const steps = data.steps.map((s, i) => `
        <div class="step">
          <div class="idx">${i+1}</div>
          <div>
            <div class="t">${s[0]}</div>
            <div class="d">${s[1]}</div>
          </div>
        </div>
      `).join("");

      const html = `
        <div style="display:flex; flex-wrap:wrap; gap:8px;">${chips}</div>
        <h3 style="margin:14px 0 0; font-size:20px; font-weight:900;">${data.title}</h3>
        <p style="margin-top:8px; color: rgba(255,255,255,.70); font-size:13px; line-height:1.6;">${data.tagline}</p>
        <div class="steps">${steps}</div>
        <div class="card" style="padding:14px; margin-top:14px;">
          <div style="font-size:12px; font-weight:900; color: rgba(255,255,255,.72);">Design note</div>
          <div style="margin-top:6px; color: rgba(255,255,255,.72); font-size:13px; line-height:1.6;">${data.callout}</div>
        </div>
      `;

      if(!animate){
        panel.innerHTML = html;
        return;
      }

      // animate out -> in
      panel.classList.remove("fade-enter", "fade-enter-active", "fade-exit", "fade-exit-active");
      panel.classList.add("fade-exit");
      requestAnimationFrame(() => {
        panel.classList.add("fade-exit-active");
        setTimeout(() => {
          panel.innerHTML = html;
          panel.classList.remove("fade-exit", "fade-exit-active");
          panel.classList.add("fade-enter");
          requestAnimationFrame(() => {
            panel.classList.add("fade-enter-active");
            setTimeout(() => {
              panel.classList.remove("fade-enter", "fade-enter-active");
            }, 260);
          });
        }, 180);
      });
    }

    function setActiveTab(key) {
      const btn = buttons.find(b => b.dataset.tab === key);
      if (!btn) return;
      buttons.forEach(b => {
        const active = b === btn;
        b.classList.toggle("active", active);
        b.setAttribute("aria-selected", active ? "true" : "false");
      });
      renderPanel(key, true);
    }

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        setActiveTab(btn.dataset.tab);
      });
    });

    // Quick Map cards: link cards open URL; pillar cards scroll to Pillars
    const pillarsSection = document.getElementById("pillars");
    document.querySelectorAll(".quickmap-card[data-pillar]").forEach(card => {
      card.addEventListener("click", () => {
        const key = card.getAttribute("data-pillar");
        if (!key) return;
        pillarsSection?.scrollIntoView({ behavior: "smooth" });
        setActiveTab(key);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.click();
        }
      });
    });

    // init
    renderPanel("cross", false);

    // ===== BibTeX copy =====
    const BIBTEX = {
      "crossearth": `@article{crossearth2024,
  title = {CrossEarth: Geospatial Vision Foundation Model for Domain Generalizable Remote Sensing Semantic Segmentation},
  author = {<!-- authors -->},
  journal = {arXiv preprint},
  year = {2024},
  url = {https://arxiv.org/abs/2410.22629}
}`,
      "earth-adapter": `@article{earthadapter2025,
  title = {Earth-Adapter: Bridge the Geospatial Domain Gaps with a Frequency-Guided Mixture of Adapters},
  author = {<!-- authors -->},
  journal = {arXiv preprint},
  year = {2025},
  url = {https://arxiv.org/abs/2504.06220}
}`,
      "crossearth-sar": `@article{crossearthsar,
  title = {CrossEarth-SAR: A SAR-Centric and Billion-Scale Geospatial Foundation Model for Domain Generalizable Semantic Segmentation},
  author = {<!-- authors -->},
  journal = {arXiv preprint},
  year = {2025}
}`,
      "crossearth-gate": `@article{crossearthgate2025,
  title = {CrossEarth-Gate: Cross-Modal Gating for Unified Optical-SAR Geospatial Perception},
  author = {<!-- authors -->},
  journal = {arXiv preprint},
  year = {2025},
  url = {https://arxiv.org/abs/2511.20302}
}`
    };
    const toast = document.getElementById("bibtex-toast");
    let toastTimer = null;
    function showBibtexToast() {
      if (toast) {
        toast.textContent = "Copied!";
        toast.removeAttribute("hidden");
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.setAttribute("hidden", "");
        }, 2000);
      }
    }
    document.querySelectorAll(".bibtex-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-bibtex-id");
        const text = BIBTEX[id];
        if (!text) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(showBibtexToast).catch(fallbackCopy);
        } else {
          fallbackCopy();
        }
        function fallbackCopy() {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
            showBibtexToast();
          } finally {
            document.body.removeChild(ta);
          }
        }
      });
    });

    // ===== Results carousel =====
    const slides = Array.from(document.querySelectorAll(".gallery-slide"));
    const dots = Array.from(document.querySelectorAll(".gallery-dot"));
    const prevBtn = document.querySelector("[data-gallery-prev]");
    const nextBtn = document.querySelector("[data-gallery-next]");
    let galleryIndex = 0;
    let galleryTimer = null;

    function showSlide(idx){
      if (!slides.length) return;
      const total = slides.length;
      const next = ((idx % total) + total) % total;

      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === next);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === next);
      });

      galleryIndex = next;
    }

    function advanceSlide(step){
      if (!slides.length) return;
      showSlide(galleryIndex + step);
    }

    function startGalleryAuto(){
      if (galleryTimer) clearInterval(galleryTimer);
      if (!slides.length) return;
      galleryTimer = setInterval(() => {
        advanceSlide(1);
      }, 5000);
    }

    if (slides.length){
      showSlide(0);
      startGalleryAuto();

      if (prevBtn){
        prevBtn.addEventListener("click", () => {
          advanceSlide(-1);
          startGalleryAuto();
        });
      }

      if (nextBtn){
        nextBtn.addEventListener("click", () => {
          advanceSlide(1);
          startGalleryAuto();
        });
      }

      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          showSlide(i);
          startGalleryAuto();
        });
      });
    }

    // ===== Footer: copyright year + WeChat QR =====
    const yearEl = document.getElementById("copyright-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const wechatWrap = document.querySelector(".foot-wechat-wrap");
    if (wechatWrap) {
      wechatWrap.addEventListener("click", (e) => {
        e.preventDefault();
        const qr = wechatWrap.querySelector(".foot-wechat-qr");
        if (qr) qr.classList.toggle("foot-wechat-qr-visible");
      });
    }
